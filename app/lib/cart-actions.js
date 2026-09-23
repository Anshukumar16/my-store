"use server";

import prisma from "./prisma";
import { requireUser } from "./auth";

export async function addToCart(productId) {
    const user = await requireUser();

    let cart = await prisma.cart.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId: user.id,
            },
        });
    }

    const existingItem = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId: productId,
            },
        },
    });

    if (existingItem) {
        await prisma.cartItem.update({
            where: {
                id: existingItem.id,
            },
            data: {
                quantity: existingItem.quantity + 1,
            },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: productId,
                quantity: 1,
            },
        });
    }
}
export async function getUserCart() {
    const user = await requireUser();

    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id,
        },
        include: {
            items: true,
        },
    });

    if (!cart) {
        return [];
    }

    const cartItems = await Promise.all(
        cart.items.map(async (item) => {
            const response = await fetch(
                `https://dummyjson.com/products/${item.productId}`
            );

            const product = await response.json();

            return {
                ...product,
                quantity: item.quantity,
            };
        })
    );

    return cartItems;
}

export async function getCartCount(userId) {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: userId,
        },
        include: {
            items: true,
        },
    });

    if (!cart) {
        return 0;
    }

    return cart.items.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
}

export async function updateCartItem(productId, quantity) {
    const user = await requireUser();

    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (!cart) {
        return;
    }

    const cartItem = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId: productId,
            },
        },
    });

    if (!cartItem) {
        return;
    }

    if (quantity <= 0) {
        await prisma.cartItem.delete({
            where: {
                id: cartItem.id,
            },
        });

        return;
    }

    await prisma.cartItem.update({
        where: {
            id: cartItem.id,
        },
        data: {
            quantity: quantity,
        },
    });
}

export async function isProductInCart(productId) {
    const user = await requireUser();

    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (!cart) {
        return false;
    }

    const cartItem = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId: productId,
            },
        },
    });

    return !!cartItem;
}

export async function getCartProductIds(userId) {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: userId,
        },
        include: {
            items: true,
        },
    });

    if (!cart) {
        return [];
    }

    return cart.items.map(item => item.productId);
}