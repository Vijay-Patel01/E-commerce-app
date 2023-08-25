import express, { Express, Request, Response, NextFunction } from 'express';
import { promisify } from 'util';
import jwt_decode from "jwt-decode";
import db from '../database/config/config';
import catchAsync from '../service/catchAsync';
import response from '../service/Response';

const User = db.users;
const Vendor = db.vendors;

const isLoggedIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.replace('Bearer ', '')?.replace('bearer ', '').trim();

    if (token) {
        const decoded: any = jwt_decode(token);
        if (decoded.email) {
            const loginVendor = await Vendor.findOne({ where: { email: decoded.email } });
            if (!loginVendor) {
                return response.errorResponse(res, 401, 'Unauthorized, Only vendor can add product');
            }
            res.locals.vendor = loginVendor;
            return next();
        }
        if (decoded.id) {
            const loginUser = await User.findOne({ where: { id: decoded.id } });
            if (!loginUser) {

                return response.errorResponse(res, 401, 'Unauthorized, Invalid token');
            }
            res.locals.user = loginUser;
            return next();
        }
    }
    return response.errorResponse(res, 401, 'You are not login please login!');
});

const restrictTo = (...roles: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(res.locals.user.role)) {
            return response.errorResponse(res, 401, 'You are not authorized to access this resource');
        }
        next();
    }
}

export default {
    isLoggedIn,
    restrictTo,
}
