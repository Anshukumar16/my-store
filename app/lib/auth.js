import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "./prisma";

export async function getCurrentUser() {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session")?.value;

    if (!sessionId) {
        return null;
    }

    const session = await prisma.session.findUnique({
        where: {
            id: sessionId,
        },
        include: {
            user: true,
        },
    });

    if (!session) {
        return null;
    }

    if (session.expiresAt < new Date()) {
        await prisma.session.delete({
            where: {
                id: session.id,
            },
        });

        return null;
    }

    return session.user;
}

export async function requireUser() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return user;
}