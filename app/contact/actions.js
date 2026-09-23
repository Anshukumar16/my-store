"use server";
import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
export async function submitForm(previousState,formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
        return {
            message: "All fields are required"
        };
    }

    if (!email.includes("@")) {
        return {
            message: "Invalid email"
        };
    }

    if (message.length < 10) {
        return {
            message: "Message must be at least 10 characters"
        };
    }

    const contactData = {
        name,
        email,
        message
    };

   await prisma.contact.create({
    data: {
        name,
        email,
        message
    }
});

    return {
        message: "Form submitted successfully!"
    };
}