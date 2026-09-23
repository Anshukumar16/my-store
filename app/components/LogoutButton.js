"use client";

import { logoutUser } from "../lib/auth-actions";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
    return (
        <form action={logoutUser}>
            <button
                className={styles.button}
                type="submit"
            >
                Logout
            </button>
        </form>
    );
}