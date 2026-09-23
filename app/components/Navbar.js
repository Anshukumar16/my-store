"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import styles from "./Navbar.module.css";

export default function Navbar({ user, totalItems }) {
    return (
        <nav className={styles.nav}>

            <Link
                href="/products"
                className={styles.brand}
            >
                My Store
            </Link>

            <div className={styles.links}>

                {user && (
                    <span className={styles.greeting}>
                        Hey {user.name} 👋
                    </span>
                )}

                <Link
                    href="/products"
                    className={styles.link}
                >
                    Products
                </Link>
                <Link href="/orders" className={styles.link}>
    Orders
</Link>
<Link href="/account" className={styles.link}>
    Account 👤
</Link>

                {user && (
                    <Link
                        href="/cart"
                        className={styles.cart}
                    >
                        🛒 Cart: {totalItems}
                    </Link>
                )}

                {user && <LogoutButton />}

            </div>

        </nav>
    );
}