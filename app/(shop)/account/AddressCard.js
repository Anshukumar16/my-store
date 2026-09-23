"use client";

import { deleteAddress } from "./address-actions";
import styles from "./account.module.css";
import Link from "next/link";

export default function AddressCard({ address }) {
    return (
        <article className={styles.addressCard}>
            <div className={styles.addressTop}>
    <div>
        <span className={styles.addressLabel}>
            {address.label === "Home" ? "🏠" : "🎓"} {address.label}
        </span>

        <h3 className={styles.addressName}>
            {address.name}
        </h3>
    </div>

    <div className={styles.addressActions}>
        <Link
            href={`/account/edit-address/${address.id}`}
            className={styles.editButton}
        >
            Edit
        </Link>

        <form action={deleteAddress}>
            <input
                type="hidden"
                name="addressId"
                value={address.id}
            />

            <button
                type="submit"
                className={styles.deleteButton}
            >
                Delete
            </button>
        </form>
    </div>
</div>

            <p className={styles.addressText}>
                {address.address}
            </p>

            <p className={styles.addressLocation}>
                {address.city}, {address.state} - {address.postalCode}
            </p>
        </article>
    );
}