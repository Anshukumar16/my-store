import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { requireUser } from "../../lib/auth";
import { getCartProductIds } from "../../lib/cart-actions";
import styles from "./products.module.css";

export default async function ProductPage() {
    const user = await requireUser();

    const cartProductIds = await getCartProductIds(user.id);
    const cartIds = new Set(cartProductIds);

    const response = await fetch(
        "https://dummyjson.com/products"
    );

    const data = await response.json();
    const products = data.products;

    return (
        <main className={styles.page}>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    Discover Your Style ✨
                </h1>

                <p className={styles.subtitle}>
                    Hey {user.name} 👋 — explore our collection.
                </p>
            </header>

            <section className={styles.grid}>
                {products.map((product) => (
                    <article
                        className={styles.card}
                        key={product.id}
                    >
                        <div className={styles.imageWrapper}>
                            <img
                                className={styles.image}
                                src={product.thumbnail}
                                alt={product.title}
                            />
                        </div>

                        <h2 className={styles.productTitle}>
                            {product.title}
                        </h2>

                        <p className={styles.price}>
                            ${product.price}
                        </p>

                        <div className={styles.actions}>
                            <Link
                                className={styles.view}
                                href={`/products/${product.id}`}
                            >
                                View Product
                            </Link>

                            <AddToCartButton
                                product={product}
                                addedToCart={cartIds.has(product.id)}
                            />
                        </div>
                    </article>
                ))}
            </section>

        </main>
    );
}