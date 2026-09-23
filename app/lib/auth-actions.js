"use server";

import { cookies } from "next/headers";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export async function logoutUser() {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session")?.value;

    if (sessionId) {
        await prisma.session.deleteMany({
            where: {
                id: sessionId,
            },
        });
    }

    cookieStore.delete("session");
    redirect("/login");
}