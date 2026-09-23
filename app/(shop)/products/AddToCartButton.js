"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "../../lib/cart-actions";
import styles from "./AddToCartButton.module.css";

export default function AddToCartButton({ product, addedToCart }) {
    const router = useRouter();

    const [added, setAdded] = useState(addedToCart);

    async function handleAddToCart() {
        try {
            await addToCart(product.id);

            setAdded(true);

            router.refresh();
        } catch (error) {
            console.error("Add to cart failed:", error);
            alert("Something went wrong. Check the terminal.");
        }
    }

    return (
        <button
            className={styles.button}
            onClick={handleAddToCart}
        >
            {added ? "Added ✓" : "Add to Cart"}
        </button>
    );
}