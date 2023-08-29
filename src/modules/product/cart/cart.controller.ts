import db from '../../../config.database';
import response from '../../../utils/response';
import  {  Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';

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
    let totalAmount = 0;
    let cart = await Cart.findAll({ where: { userId } });
    if (!cart) {
        return response.errorResponse(res, 404, 'No item your cart');
    }
    for (let i = 0; i < cart.length; i++) {
        const productId = cart[i].productId
        const product = await Product.findOne({ where: { id: productId } });
        const price = cart[i].quantity * product.price;
        cart[i]["totalPrice"] = price;
        totalAmount += price;

    }

    return response.response(res, 200, { cart, totalAmount }, 'Cart retrieved successful');
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id;
    const id = req.params.id;
    const data = await Cart.destroy({ where: [{ id }, { userId }] });
    if (!data) {
        return response.errorResponse(res, 400, 'Product not found with this productId in your cart');
    }
    return response.response(res, 200, {}, 'Product removed from cart successful');
});

export default {
    addCart,
    myCart,
    removeFromCart
}