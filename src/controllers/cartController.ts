import db from '../database/config/config';
import response from '../service/Response';
import express, { Express, Request, Response, NextFunction } from 'express';
import catchAsync from '../service/catchAsync';

const Cart = db.carts;
const Product = db.products;

const addCart = catchAsync(async (req: Request, res: Response) => {
    const productId = res.locals.cartItem.productId;
    const quantity = res.locals.cartItem.quantity;
    const userId = res.locals.user.id;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
        return response.errorResponse(res, 400, 'Product not found with this productId');
    }
    const currentCart = await Cart.findOne({ where: [{ productId }, { userId }] });

    if (currentCart) {
        currentCart.quantity = currentCart.quantity + quantity;
        await currentCart.save();
        return response.response(res, 200, { currentCart }, 'Cart update successful');
    }
    const newCart = await Cart.create({ userId, productId, quantity });
    return response.response(res, 201, { newCart }, 'Cart created successful');
});

const myCart = catchAsync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id;
    let cart = await Cart.findAll({ where: { userId } });
    if (!cart) {
        return response.errorResponse(res, 404, 'No item your cart');
    }
    for (let i = 0; i < cart.length; i++) {
        const productId = cart[i].productId
        const product = await Product.find({ where: { id: productId } });
        const totalPrice = cart[i].quantity * product.price;
        cart[i]["totalPrice"] = totalPrice;
    }
    return response.response(res, 200, { cart }, 'Cart retrieved successful');
});

export default {
    addCart,
    myCart
}