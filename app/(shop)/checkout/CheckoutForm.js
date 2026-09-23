"use client";

import { placeOrder } from "./actions";
import styles from "./checkout.module.css";
import AddressSelector from "./AddressSelector";

export default function CheckoutForm({ user, cartItems, addresses }) {
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <form action={placeOrder}>
            <div className={styles.container}>

                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        Delivery Address 📍
                    </h2>

                    <AddressSelector addresses={addresses} />
                </section>

                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        Order Summary
                    </h2>

                    <div className={styles.items}>
                        {cartItems.map((item) => (
                            <div
                                className={styles.item}
                                key={item.id}
                            >
                                <div>
                                    <p className={styles.itemTitle}>
                                        {item.title}
                                    </p>

                                    <p className={styles.quantity}>
                                        Qty: {item.quantity}
                                    </p>
                                </div>

                                <p className={styles.itemPrice}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.totalRow}>
                        <span>Total</span>

                        <strong>
                            ${totalPrice.toFixed(2)}
                        </strong>
                    </div>

                    <button
                        className={styles.button}
                        type="submit"
                    >
                        Place Order 🎉
                    </button>
                </section>

            </div>
        </form>
    );
}