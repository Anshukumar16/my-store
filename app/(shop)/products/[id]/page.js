import { notFound } from "next/navigation";
import AddToCartButton from "../AddToCartButton";
import { requireUser } from "../../../lib/auth";
import { isProductInCart } from "../../../lib/cart-actions";
import styles from "./product.module.css";
export default async function ProductPage({ params }) {
    const user = await requireUser();

    const { id } = await params;

    const response = await fetch(
        `https://dummyjson.com/products/${id}`
    );

    if (!response.ok) {
        notFound();
    }

    const product = await response.json();

    const addedToCart = await isProductInCart(product.id);

    return (
       
    <main className={styles.page}>
        <div className={styles.container}>

            <div className={styles.imageWrapper}>
                <img
                    className={styles.image}
                    src={product.thumbnail}
                    alt={product.title}
                />
            </div>

            <div className={styles.info}>

                <span className={styles.category}>
                    {product.category}
                </span>

                <h1 className={styles.title}>
                    {product.title}
                </h1>

                <p className={styles.description}>
                    {product.description}
                </p>

                <p className={styles.price}>
                    ${product.price}
                </p>

                <div className={styles.meta}>

                    <div className={styles.metaItem}>
                        <strong>Rating</strong>
                        ⭐ {product.rating}
                    </div>

                    <div className={styles.metaItem}>
                        <strong>Stock</strong>
                        {product.stock}
                    </div>

                    <div className={styles.metaItem}>
                        <strong>Brand</strong>
                        {product.brand}
                    </div>

                    <div className={styles.metaItem}>
                        <strong>Shipping</strong>
                        {product.shippingInformation}
                    </div>

                </div>

                <AddToCartButton
                    product={product}
                    addedToCart={addedToCart}
                />

                <p>
                    {product.warrantyInformation}
                </p>

            </div>

        </div>
    </main>
);
    
}