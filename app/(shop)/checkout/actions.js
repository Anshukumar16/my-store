"use server";

import prisma from "../../lib/prisma";
import { requireUser } from "../../lib/auth";
import { redirect } from "next/navigation";

export async function placeOrder(formData) {
    const user = await requireUser();

    // Get selected saved address
    const addressId = Number(formData.get("addressId"));

    const address = await prisma.address.findFirst({
        where: {
            id: addressId,
            userId: user.id,
        },
    });

    if (!address) {
        throw new Error("Please select a valid delivery address");
    }

    // Get user's cart
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id,
        },
        include: {
            items: true,
        },
    });

    if (!cart || cart.items.length === 0) {
        throw new Error("Your cart is empty");
    }

    // Get product details
    const products = await Promise.all(
        cart.items.map(async (item) => {
            const response = await fetch(
                `https://dummyjson.com/products/${item.productId}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch product");
            }

            const product = await response.json();

            return {
                ...product,
                quantity: item.quantity,
            };
        })
    );

    // Calculate total
    const totalPrice = products.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);
// Create order and clear cart in one transaction
const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
        data: {
            userId: user.id,
            totalPrice,
            status: "PLACED",

            shippingName: address.name,
            shippingEmail: user.email,
            shippingAddress: address.address,
            shippingCity: address.city,
            shippingState: address.state,
            shippingPostalCode: address.postalCode,

            items: {
                create: products.map((product) => ({
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: product.quantity,
                })),
            },
        },
    });

    await tx.cartItem.deleteMany({
        where: {
            cartId: cart.id,
        },
    });

    return newOrder;
});

// Redirect after the transaction succeeds
redirect(`/orders/${order.id}`);
}