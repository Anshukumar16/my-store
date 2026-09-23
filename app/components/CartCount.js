"use client";

import { useCart } from "@/app/context/CartContext";

export default function CartCount() {
    const { cart } = useCart();

    return (
        <p>Cart: {cart.length}</p>
    );
}