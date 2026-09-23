"use client";

import styles from "./login.module.css";
import { useActionState } from "react";
import Link from "next/link";
import { loginUser } from "./actions";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className={styles.button}
            type="submit"
            disabled={pending}
        >
            {pending ? "Logging in..." : "Login"}
        </button>
    );
}

export default function LoginForm() {
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");

    const [state, formAction] = useActionState(
        loginUser,
        { message: "" }
    );

    return (
        <main className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    Welcome back 👋
                </h1>

                <p className={styles.subtitle}>
                    Login to continue shopping
                </p>

                <form
                    action={formAction}
                    className={styles.form}
                >
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />

                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                    />

                    <LoginButton />

                    <p className={styles.message}>
                        {state.message}
                    </p>
                </form>

                <p className={styles.register}>
                    New user?{" "}
                    <Link href="/register">
                        Create an account
                    </Link>
                </p>

                {registered === "true" && (
                    <p className={styles.success}>
                        Account created successfully!
                        Please log in.
                    </p>
                )}
            </div>
        </main>
    );
}