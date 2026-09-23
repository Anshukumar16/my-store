"use client";

import { updateAddress } from "./address-actions";
import styles from "./account.module.css";

export default function EditAddress({ address }) {
    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <p className={styles.eyebrow}>DELIVERY</p>

                <h1 className={styles.title}>
                    Edit Address ✏️
                </h1>

                <p className={styles.subtitle}>
                    Update your saved delivery address.
                </p>
            </header>

            <form action={updateAddress} className={styles.form}>
                <input
                    type="hidden"
                    name="id"
                    value={address.id}
                />

                <label className={styles.label}>
                    Address Label

                    <select
                        name="label"
                        defaultValue={address.label}
                        className={styles.input}
                        required
                    >
                        <option value="Home">🏠 Home</option>
                        <option value="College">🎓 College</option>
                        <option value="Other">📍 Other</option>
                    </select>
                </label>

                <label className={styles.label}>
                    Full Name

                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        defaultValue={address.name}
                        required
                    />
                </label>

                <label className={styles.label}>
                    Address

                    <textarea
                        className={styles.input}
                        name="address"
                        rows="3"
                        defaultValue={address.address}
                        required
                    />
                </label>

                <label className={styles.label}>
                    City

                    <input
                        className={styles.input}
                        type="text"
                        name="city"
                        defaultValue={address.city}
                        required
                    />
                </label>

                <label className={styles.label}>
                    State

                    <input
                        className={styles.input}
                        type="text"
                        name="state"
                        defaultValue={address.state}
                        required
                    />
                </label>

                <label className={styles.label}>
                    Postal Code

                    <input
                        className={styles.input}
                        type="text"
                        name="postalCode"
                        defaultValue={address.postalCode}
                        required
                    />
                </label>

                <button
                    type="submit"
                    className={styles.button}
                >
                    Save Changes ✨
                </button>
            </form>
        </main>
    );
}