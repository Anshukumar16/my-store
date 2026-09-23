"use client";

import { addAddress } from "./address-actions";
import styles from "./account.module.css";

export default function AddAddress({ returnTo }) {
    return (
       <form action={addAddress} className={styles.form}>
    <input
        type="hidden"
        name="returnTo"
        value={returnTo || ""}
    />
            <h2 className={styles.formTitle}>Add New Address 📍</h2>

            <label className={styles.label}>
                Address Label
                <select name="label" className={styles.input} required>
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
                    required
                />
            </label>

            <label className={styles.label}>
                Address
                <textarea
                    className={styles.input}
                    name="address"
                    rows="3"
                    required
                />
            </label>

            <label className={styles.label}>
                City
                <input
                    className={styles.input}
                    type="text"
                    name="city"
                    required
                />
            </label>

            <label className={styles.label}>
                State
                <input
                    className={styles.input}
                    type="text"
                    name="state"
                    required
                />
            </label>

            <label className={styles.label}>
                Postal Code
                <input
                    className={styles.input}
                    type="text"
                    name="postalCode"
                    required
                />
            </label>

            <button className={styles.button} type="submit">
                Save Address
            </button>
        </form>
    );
}