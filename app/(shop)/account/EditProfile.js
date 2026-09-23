"use client";

import { updateProfile } from "./actions";
import styles from "./account.module.css";

export default function EditProfile({ user }) {
    return (
        <form action={updateProfile} className={styles.form}>
            <h2 className={styles.formTitle}>
                Edit Profile ✨
            </h2>

            <label className={styles.label}>
                Name

                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    required
                />
            </label>

            <label className={styles.label}>
                Email

                <input
                    className={styles.input}
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    required
                />
            </label>

            <button
                className={styles.button}
                type="submit"
            >
                Save Changes
            </button>
        </form>
    );
}