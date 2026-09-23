"use client";

import { useActionState } from "react";
import { registerUser } from "./actions";
import { useFormStatus } from "react-dom";
import styles from "./register.module.css";
import Link from "next/link";

function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className={styles.button}
            type="submit"
            disabled={pending}
        >
            {pending ? "Creating account..." : "Create Account"}
        </button>
    );
}

export default function RegisterPage() {
    const [state, formAction] = useActionState(
        registerUser,
        { message: "" }
    );

    return (
        <main className={styles.page}>
            <div className={styles.card}>

                <h1 className={styles.title}>
                    Create Account ✨
                </h1>

                <p className={styles.subtitle}>
                    Join My Store and start shopping.
                </p>

                <form
                    action={formAction}
                    className={styles.form}
                >
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                    />

                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                    />

                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                    />

                    <RegisterButton />

                    <p className={styles.message}>
                        {state.message}
                    </p>
                </form>
                <p className={styles.login}>
    Already have an account?{" "}
    <Link href="/login">
        Login
    </Link>
</p>

            </div>
        </main>
    );
}