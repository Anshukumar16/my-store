"use client";

import CartItem from "../../components/CartItem";
import Link from "next/link";
import styles from "./cart.module.css";

export default function CartContent({ cartItems }) {
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>
                    🛒
                </div>

                <h2 className={styles.emptyTitle}>
                    Your cart is empty
                </h2>

                <p className={styles.emptyText}>
                    Looks like you haven't added anything yet.
                </p>

                <Link
                    href="/products"
                    className={styles.shopping}
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className={styles.items}>
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>

            <div className={styles.summary}>
                <p className={styles.total}>
                    Total: ${totalPrice.toFixed(2)}
                </p>

                <Link
                    href="/checkout"
                    className={styles.checkout}
                >
                    Proceed to Checkout →
                </Link>
            </div>
        </>
    );
}