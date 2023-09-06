import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import response from '../utils/response';

const validationResponse = (res: Response, err: any) => {
    response.errorResponse(res, 400, err.details[0].message)
}

const orderPlace = async (req: Request, res: Response, next: NextFunction) => {
    const body = joi.object({
        productId : joi.number().required(),
        quantity : joi.number().required(),
        paymentMethod : joi.string().valid('case', 'card').required(), 
        status : joi.string().valid('pending', 'processing', 'complete').default('pending'),
    });
    const { error, value } = body.validate(req.body);
    if (error) {
        return validationResponse(res ,error);
    }
    res.locals.order = value;
    next();
}

export default {
    orderPlace
}