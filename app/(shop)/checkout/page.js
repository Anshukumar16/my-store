import { requireUser } from "../../lib/auth";
import { getUserCart } from "../../lib/cart-actions";
import CheckoutForm from "./CheckoutForm";
import styles from "./checkout.module.css";
import prisma from "../../lib/prisma";

export default async function CheckoutPage() {
    const user = await requireUser();

    const addresses = await prisma.address.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const cartItems = await getUserCart();

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    Checkout ✨
                </h1>

                <p className={styles.subtitle}>
                    Almost there, {user.name} 👋
                </p>
            </header>

            <CheckoutForm
                user={user}
                cartItems={cartItems}
                addresses={addresses}
            />
        </main>
    );
}