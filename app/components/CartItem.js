"use client";

import { useRouter } from "next/navigation";
import { updateCartItem } from "../lib/cart-actions";
import styles from "./CartItem.module.css";

export default function CartItem({ item }) {
    const router = useRouter();

    async function increaseQuantity() {
        await updateCartItem(item.id, item.quantity + 1);
        router.refresh();
    }

    async function decreaseQuantity() {
        await updateCartItem(item.id, item.quantity - 1);
        router.refresh();
    }

    async function removeFromCart() {
        await updateCartItem(item.id, 0);
        router.refresh();
    }

    return (
        <article className={styles.item}>

            <img
                className={styles.image}
                src={item.thumbnail}
                alt={item.title}
            />

            <div className={styles.info}>
                <h2 className={styles.title}>
                    {item.title}
                </h2>

                <p className={styles.price}>
                    ${item.price}
                </p>
            </div>

            <div className={styles.controls}>

                <button
                    className={styles.quantityButton}
                    onClick={decreaseQuantity}
                >
                    −
                </button>

                <span className={styles.quantity}>
                    {item.quantity}
                </span>

                <button
                    className={styles.quantityButton}
                    onClick={increaseQuantity}
                >
                    +
                </button>

                <button
                    className={styles.remove}
                    onClick={removeFromCart}
                >
                    Remove
                </button>

            </div>

        </article>
    );
}