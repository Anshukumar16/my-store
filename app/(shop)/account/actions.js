"use server";

import prisma from "../../lib/prisma";
import { requireUser } from "../../lib/auth";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
    const user = await requireUser();

    const name = formData.get("name");
    const email = formData.get("email");

    if (!name || !email) {
        throw new Error("Name and email are required");
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email,
            NOT: {
                id: user.id,
            },
        },
    });

    if (existingUser) {
        throw new Error("Email is already being used");
    }

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            name,
            email,
        },
    });

    redirect("/account");
}