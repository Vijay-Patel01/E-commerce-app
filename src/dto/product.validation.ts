import joi from 'joi';
import express, { Request, Response, NextFunction } from 'express';
import response from '../utils/response';

const validationResponse = (res: Response, err: any) => {
    response.errorResponse(res, 400, err.details[0].message)
}

const createValidation = (req: Request, res: Response, next: NextFunction) => {
    const body = joi.object({
        name: joi.string().required(),
        category: joi.string().required(),
        description: joi.string().default(''),
        price: joi.number().required(),
        stock: joi.number().default(0),
        status: joi.string().valid('active', 'inactive').default('active')
    });
    const { error, value } = body.validate(req.body);
    if (error) {
        return validationResponse(res, error);
    };
    res.locals.product = value;
    next();
}

const ProductUpdate = (req: Request, res: Response, next: NextFunction) => {
    const body = joi.object({
        name: joi.string(),
        category: joi.string(),
        description: joi.string(),
        price: joi.number(),
        stock: joi.number(),
        status: joi.string().valid('active', 'inactive')
    });
    const { error, value } = body.validate(req.body);
    if (error) {
        return validationResponse(res, error);
    };
    res.locals.product = value;
    next();
}

const cartAdd = (req: Request, res: Response, next: NextFunction) => {
    const body = joi.object({
        productId: joi.number().required(),
        quantity: joi.number().required().min(1).max(100),
    });
    const { error, value } = body.validate(req.body);
    if (error) {
        return validationResponse(res, error);
    };
    res.locals.cartItem = value;
    next()
}

export default {
    createValidation,
    ProductUpdate,
    cartAdd
};