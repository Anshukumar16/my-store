import { notFound } from "next/navigation";
import { requireUser } from "../../../lib/auth";
import prisma from "../../../lib/prisma";
import styles from "./order.module.css";
import Link from "next/link";

export default async function OrderPage({ params }) {
    const user = await requireUser();

    const { id } = await params;
    const orderId = Number(id);

    if (Number.isNaN(orderId)) {
        notFound();
    }

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: user.id,
        },
        include: {
            items: true,
        },
    });

    if (!order) {
        notFound();
    }

    return (
        <main className={styles.page}>

            <header className={styles.header}>
                <div className={styles.successIcon}>
                    ✓
                </div>

                <h1 className={styles.title}>
                    Order Placed! 🎉
                </h1>

                <p className={styles.subtitle}>
                    Thanks for shopping with us, {user.name}.
                </p>
            </header>


            <div className={styles.container}>

                <section className={styles.card}>
                    <div className={styles.orderHeader}>
                        <div>
                            <p className={styles.label}>
                                Order
                            </p>

                            <h2 className={styles.orderId}>
                                #{order.id}
                            </h2>
                        </div>

                        <span className={styles.status}>
                            {order.status}
                        </span>
                    </div>


                    <div className={styles.items}>

                        {order.items.map((item) => (
                            <article
                                className={styles.item}
                                key={item.id}
                            >
                                <div>
                                    <h3 className={styles.itemTitle}>
                                        {item.title}
                                    </h3>

                                    <p className={styles.quantity}>
                                        Quantity: {item.quantity}
                                    </p>
                                </div>

                                <p className={styles.itemPrice}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </article>
                        ))}

                    </div>


                    <div className={styles.total}>
                        <span>Total</span>

                        <strong>
                            ${order.totalPrice.toFixed(2)}
                        </strong>
                    </div>
                </section>


                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        Delivery Details
                    </h2>

                    <div className={styles.address}>
                        <p>
                            <strong>{order.shippingName}</strong>
                        </p>

                        <p>{order.shippingEmail}</p>

                        <p>{order.shippingAddress}</p>

                        <p>
                            {order.shippingCity},{" "}
                            {order.shippingState}
                        </p>

                        <p>
                            PIN: {order.shippingPostalCode}
                        </p>
                    </div>
                </section>
                <div className={styles.buttonContainer}>
   <Link
    href="/products"
    style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "15px 30px",
        borderRadius: "14px",
        background: "linear-gradient(135deg, #2563eb, #4f46e5)",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "600",
        textDecoration: "none",
        boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
    }}
>
    Continue Shopping <span>→</span>
</Link>
</div>

            </div>
          

        </main>
    );
}