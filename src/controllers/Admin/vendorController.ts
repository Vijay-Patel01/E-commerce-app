import db from '../../database/config/config';
import response from '../../service/Response';
import express, { Express, Request, Response, NextFunction } from 'express';
import catchAsync from '../../service/catchAsync';
import bcrypt from 'bcrypt';
import factory from '../../service/factory';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const Vendor = db.vendors;
const Product = db.products;

const create = catchAsync(async (req: Request, res: Response) => {
    const vendorUsername = await Vendor.findOne({
        where: { username: res.locals.vendor.username },
    });
    if (vendorUsername) {
        return response.errorResponse(res, 400, 'This username already taken if you have account Please use login');
    }
    const vendorEmail = await Vendor.findOne({
        where: { email: res.locals.vendor.email }
    });
    if (vendorEmail) {
        return response.errorResponse(res, 400, 'This email already taken if you have account Please use login');
    }
    const round = Number(process.env.BCRYPT_ROUND) || 12;
    const hashPassword = await bcrypt.hash(res.locals.vendor.password, round);
    res.locals.vendor.password = hashPassword;
    const vendor = await Vendor.create(res.locals.vendor);
    if (vendor) {
        return response.response(res, 201, { vendor }, 'Vendor added successful');
    }
    return response.errorResponse(res, 400, 'Something went wrong in vendor add');
});

const updateVendor = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const vendor = await Vendor.findByPk(id);
    if (!vendor) {
        return response.errorResponse(res, 404, 'Vendor not found');
    }
    const updatedVendor = await vendor.update(res.locals.vendor, {
        where: { id }
    });
    return response.response(res, 200, { updatedVendor }, 'Vendor updated successful');
});

const getMyProduct = catchAsync(async (req: Request, res: Response) => {
    const id = res.locals.vendor.id;
    console.log(id);
    
    const products = await Product.findAll({
        where: { vendorId:id }
    });
    return response.response(res, 200, { products }, 'Products fetched successful');
});

const getAllVendor = factory.getAll(Vendor);
const getOneVendor = factory.getOne(Vendor);
const deleteVendor = factory.deleteOne(Vendor);

export default {
    create,
    getAllVendor,
    getOneVendor,
    deleteVendor,
    updateVendor,
    getMyProduct
}