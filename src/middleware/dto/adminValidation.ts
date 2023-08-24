import joi, { any, object } from 'joi';

import express, { Request, Response, NextFunction } from 'express';
import response from '../../service/Response';

const validationResponse = (res: Response, err: any) => {
    response.errorResponse(res, 400, err.details[0].message)
}

const authValidation = async (req: Request, res: Response, next: NextFunction) => {
    const body = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(32).required(),
        confirmPassword: joi.valid(joi.ref('password')).required(),
        role: joi.string().valid('admin', 'user').default('user'),
        status: joi.string().valid('active', 'inactive').default('active')
    });
    const { error, value } = body.validate(req.body);
    if (error) {
        return validationResponse(res ,error);
    };
    req.body = value;
    next();
}
const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
    const body = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const { error, value } = body.validate(req.body);
    if (error) {
        return validationResponse(res ,error);
    };
    req.body = value;
    next()
}

const vendorAddValidation = async (req: Request, res: Response, next: NextFunction) => {
    const body = joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(32).required(),
        confirmPassword: joi.valid(joi.ref('password')).required(),
        status: joi.string().valid('active', 'inactive').default('active')
    });
    const { error, value } = body.validate(req.body);
    if (error) {
        return validationResponse(res ,error);
    };
    req.body = value;
    next();
}

const vendorLoginValidation = async (req: Request, res: Response, next: NextFunction) => {
    const body = joi.object({
        email: joi.string().email(),
        username: joi.string(),
        password: joi.string().required()
    });
    const { error, value } = body.validate(req.body);
    if (error) {
        return validationResponse(res ,error);
    };
    res.locals.vendor = value;
    next();
}

export default {
    authValidation,
    loginValidation,
    vendorAddValidation,
    vendorLoginValidation
}