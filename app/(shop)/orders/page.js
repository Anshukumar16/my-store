import Link from "next/link";
import { requireUser } from "../../lib/auth";
import prisma from "../../lib/prisma";
import styles from "./orders.module.css";

export default async function OrdersPage() {
    const user = await requireUser();

    const orders = await prisma.order.findMany({
        where: {
            userId: user.id,
        },
        include: {
            items: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>My Orders 📦</h1>

                <p className={styles.subtitle}>
                    Hey {user.name} 👋 — here are your orders.
                </p>
            </header>

            <section className={styles.orders}>
                {orders.length === 0 ? (
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon}>📦</div>

                        <h2>No orders yet</h2>

                        <p>
                            Your orders will appear here after you place one.
                        </p>

                        <Link href="/products" className={styles.shop}>
                            Start Shopping →
                        </Link>
                    </div>
                ) : (
                    orders.map((order) => (
                        <article
                            className={styles.card}
                            key={order.id}
                        >
                            <div className={styles.cardHeader}>
                                <div>
                                    <p className={styles.label}>
                                        Order
                                    </p>

                                    <h2>#{order.id}</h2>
                                </div>

                               <span className={`${styles.status} ${styles.statusBadge}`}>
    {order.status.replaceAll("_", " ")}
</span>
                            </div>

                            <div className={styles.info}>
                                <p>
                                    <strong>
                                        {order.items.length}
                                    </strong>{" "}
                                    product
                                    {order.items.length !== 1
                                        ? "s"
                                        : ""}
                                </p>

                                <p>
                                    ${order.totalPrice.toFixed(2)}
                                </p>
                            </div>

                            <div className={styles.footer}>
                                <p>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>

                               <Link
    href={`/orders/${order.id}`}
    className={`${styles.view} ${styles.viewButton}`}
>
    View Order <span>→</span>
</Link>
                            </div>
                        </article>
                    ))
                )}
            </section>
        </main>
    );
}