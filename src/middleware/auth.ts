import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/jwt';
import db from '../config.database';
import catchAsync from '../utils/catchAsync';
import response from '../utils/response';

const User = db.users;
const Vendor = db.vendors;

const isLoggedIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.replace('Bearer ', '')?.replace('bearer ', '').trim();

    if (token) {
        const decoded: any = jwt.decodeToken(token);
        if (decoded.type === 'vendor') {
            const loginVendor = await Vendor.findOne({ where: { email: decoded.email } });
            if (!loginVendor) {
                return response.errorResponse(res, 401, 'Unauthorized, Only vendor can access this route');
            }
            res.locals.vendor = loginVendor;
            return next();
        }
        if (decoded.type === 'user') {
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

const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
        return response.errorResponse(res, 401, 'You are not authorized to access this resource');
    }
    if (res.locals.user.role !== 'admin') {
        return response.errorResponse(res, 401, 'You are not authorized to access this resource');
    }
    next();
}

const vendorOnly = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.vendor) {
        return response.errorResponse(res, 401, 'Unauthorized, Only vendor access this resource');
    }
    next();
}

export default {
    isLoggedIn,
    adminOnly,
    vendorOnly
}
