"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./checkout.module.css";

export default function AddressSelector({ addresses }) {
    const [selectedId, setSelectedId] = useState(
        addresses[0]?.id ?? ""
    );

    const selectedAddress = addresses.find(
        (address) => address.id === Number(selectedId)
    );

    if (addresses.length === 0) {
        return (
            <div className={styles.emptyAddress}>
                <p>No saved addresses yet.</p>

                <Link
    href="/account?returnTo=checkout"
    className={styles.addAddressLink}
>
    ＋ Add new address
</Link>
            </div>
        );
    }

    return (
        <div className={styles.addressSelector}>

            <div className={styles.addressList}>
                {addresses.map((address) => {
                    const isSelected = address.id === selectedId;

                    return (
                        <button
                            type="button"
                            key={address.id}
                            className={`${styles.addressOption} ${
                                isSelected ? styles.selectedAddress : ""
                            }`}
                            onClick={() => setSelectedId(address.id)}
                        >
                            <div className={styles.addressHeader}>
                                <span className={styles.addressLabel}>
                                    {address.label === "Home"
                                        ? "🏠"
                                        : address.label === "College"
                                        ? "🎓"
                                        : "📍"}{" "}
                                    {address.label}
                                </span>

                                {isSelected && (
                                    <span className={styles.checkmark}>
                                        ✓
                                    </span>
                                )}
                            </div>

                            <div className={styles.addressInfo}>
                                <strong>{address.name}</strong>

                                <p>{address.address}</p>

                                <p>
                                    {address.city},{" "}
                                    {address.state} -{" "}
                                    {address.postalCode}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            <input
                type="hidden"
                name="addressId"
                value={selectedId}
            />

            <Link
                href="/account"
                className={styles.addAddressLink}
            >
                ＋ Add new address
            </Link>

        </div>
    );
}