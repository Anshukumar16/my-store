import { requireUser } from "../../lib/auth";
import { getUserCart } from "../../lib/cart-actions";
import CartContent from "./CartContent";
import styles from "./cart.module.css";

export default async function CartPage() {
    const user = await requireUser();

    const cartItems = await getUserCart();

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    Your Cart 🛍️
                </h1>

                <p className={styles.greeting}>
                    Hey {user.name} 👋 — almost yours.
                </p>
            </header>

            <div className={styles.content}>
                <CartContent cartItems={cartItems} />
            </div>
        </main>
    );
}