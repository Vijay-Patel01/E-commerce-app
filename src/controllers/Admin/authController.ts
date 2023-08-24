import db from '../../database/config/config';
import response from '../../service/Response';
import jwtToken from 'jsonwebtoken';
import express, { Express, Request, Response, NextFunction } from 'express';
import catchAsync from '../../service/catchAsync';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const User = db.users;
const Vendor = db.vendors;

const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const alreadyUser = await User.findOne({ where: { email: req.body.email } });
    if (alreadyUser) {
        return response.errorResponse(res,400,'This email already taken Please use login');
    }
    
    const round : number = Number(process.env.BCRYPT_ROUND) || 12 ;
    const hashPassword = await bcrypt.hash(req.body.password, round);
    req.body.password = hashPassword;
    
    const user = await User.create(req.body);
    if (user) {
        const id = user.id
        const token = jwtToken.sign({ id }, process.env.JWT_SECRET_KEY as string, { expiresIn: process.env.JWT_EXPIRES_IN });
        response.response(res, 201, {
            user,
            token,
        }, 'SignUp successful');
    }
    response.errorResponse(res, 400, 'Error creating user');
});

const login = catchAsync(async (req: Request, res: Response,) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return response.errorResponse(res,400,'Invalid email or password');
    }
    if (user.status === 'inactive'){
        return response.errorResponse(res,400,'Your account is inactive Please contact admin');
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return response.errorResponse(res,400,'Invalid email or password');
    }
    const id = user.id;
    const token = jwtToken.sign({ id }, process.env.JWT_SECRET_KEY as string, { expiresIn: process.env.JWT_EXPIRES_IN});
    response.response(res, 201, {user,token}, 'SignIn successful');
});

const vendorLogin =  catchAsync(async (req: Request, res: Response,) => {
    if (!res.locals.vendor.email && !res.locals.vendor.username) {
        return response.errorResponse(res, 400, 'Please enter email or username');
    }
    const vendor = await Vendor.findOne({
        where: {}
    });
    if (!vendor) {
        return response.errorResponse(res, 400, 'Invalid email or password');
    }
    if (vendor.status === 'inactive') {
        return response.errorResponse(res, 400, 'Your account is inactive Please contact admin');
    }
    const isMatch = await bcrypt.compare(res.locals.vendor.password, vendor.password);
    if (!isMatch) {
        return response.errorResponse(res, 400, 'Invalid email or password');
    }
    const id = vendor.id;
    const token = jwtToken.sign({ id }, process.env.JWT_SECRET_KEY as string, { expiresIn: process.env.JWT_EXPIRES_IN });
    response.response(res, 201, {vendor,token}, 'SignIn successful');
});



export default {
    signup,
    login,
    vendorLogin
}
