import db from '../../database/config/config';
import response from '../../service/Response';
import express, { Express, Request, Response, NextFunction } from 'express';
import catchAsync from '../../service/catchAsync';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const Vendor = db.vendors;

const create = catchAsync(async (req: Request, res: Response) => {
    const vendorUsername = await Vendor.findOne({
        where: {username: req.body.username},
    });
    if (vendorUsername) {
        return response.errorResponse(res,400,'This username already taken if you have account Please use login');
    }
    const vendorEmail = await Vendor.findOne({
            where:{email: req.body.email}
    });
    if (vendorEmail) {
        return response.errorResponse(res,400,'This email already taken if you have account Please use login');
    }
    const round = Number(process.env.BCRYPT_ROUND) || 12;
    const hashPassword = await bcrypt.hash(req.body.password, round);
    req.body.password = hashPassword;
    const vendor = await Vendor.create(req.body);
    if (vendor) {
        return response.response(res, 201, { vendor }, 'Vendor added successful');
    }
    return response.errorResponse(res, 400, 'Something went wrong in vendor add');
});

export default {
    create
}