"use server";

import prisma from "../../lib/prisma";
import { requireUser } from "../../lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export async function updateAddress(formData) {
    const user = await requireUser();
    const returnTo = formData.get("returnTo");

    const id = Number(formData.get("id"));
    const label = formData.get("label");
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const postalCode = formData.get("postalCode");

    if (
        !id ||
        !label ||
        !name ||
        !address ||
        !city ||
        !state ||
        !postalCode
    ) {
        throw new Error("All address fields are required");
    }

    await prisma.address.updateMany({
        where: {
            id,
            userId: user.id,
        },
        data: {
            label,
            name,
            address,
            city,
            state,
            postalCode,
        },
    });

    redirect("/account");
}

export async function addAddress(formData) {
    const user = await requireUser();
    const returnTo = formData.get("returnTo");
    const label = formData.get("label");
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const postalCode = formData.get("postalCode");

    if (!label || !name || !address || !city || !state || !postalCode) {
        throw new Error("All address fields are required");
    }

    await prisma.address.create({
        data: {
            userId: user.id,
            label,
            name,
            address,
            city,
            state,
            postalCode,
        },
    });

   revalidatePath("/account");
   revalidatePath("/checkout");

   redirect("/account");
}

export async function deleteAddress(formData) {
    const user = await requireUser();

    const addressId = Number(formData.get("addressId"));

    if (!addressId) {
        throw new Error("Invalid address");
    }

    await prisma.address.deleteMany({
        where: {
            id: addressId,
            userId: user.id,
        },
    });

   if (returnTo === "checkout") {
    redirect("/checkout");
}

redirect("/account");
}