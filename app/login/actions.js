"use server";
import { cookies } from "next/headers";
import crypto from "crypto";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function loginUser(previousState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        return {
            message: "Email and password are required"
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return {
            message: "Invalid email or password"
        };
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        return {
            message: "Invalid email or password"
        };
    }

const sessionId = crypto.randomUUID();

const expiresAt = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 7
);

await prisma.session.create({
    data: {
        id: sessionId,
        userId: user.id,
        expiresAt: expiresAt,
    },
});

const cookieStore = await cookies();

cookieStore.set("session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
});

redirect("/products");

}