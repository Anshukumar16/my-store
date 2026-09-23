"use client";

import { useActionState } from "react";
import { submitForm } from "./actions";
import SubmitButton from "./SubmitButton";

export default function ContactForm() {
    const [state, formAction] = useActionState(
        submitForm,
        { message: "" }
    );

    return (
        <form action={formAction}>

            <input
                type="text"
                name="name"
                placeholder="Enter your name"
            />

            <input
                type="email"
                name="email"
                placeholder="Enter your email"
            />

            <textarea
                name="message"
                placeholder="Enter your message"
            />

           <SubmitButton/>

            <p>{state.message}</p>

        </form>
    );
}