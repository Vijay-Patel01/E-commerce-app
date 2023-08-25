import db from '../database/config/config';
import response from '../service/Response';
import express, { Express, Request, Response, NextFunction } from 'express';
import catchAsync from '../service/catchAsync';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';

const Product = db.products;

const fileStorage = multer.memoryStorage();

const fileFilter = (request: Request, file: Express.Multer.File,callback:FileFilterCallback) : void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
        // return response.errorResponse(res,400,'Not an image! Please upload only images.');
    }
}

const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
});

const uploadImages = upload.fields([
    { name: 'cover_image', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]);

//Cover image
// const resizeImages = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
//     if(!req.files) return next();
//     res.locals.product.cover_image = `product-${res.locals.product.name}-${Date.now()}-cover.jpeg`; 
//     await sharp(req.files.cover_image[0].buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`images/product/${res.locals.product.name}/${res.locals.product.cover_image}`);
// })

const create = catchAsync(async (req: Request, res: Response) => {
    if(!res.locals.vendor){
        return response.errorResponse(res,401,'Unauthorized, Only vendor can add product');
    }
    res.locals.product.vendorId = res.locals.vendor.id;
    const product = await Product.create(res.locals.product);
    if (product) {
        return response.response(res, 201, { product }, 'Product added successful');
    }
    return response.errorResponse(res, 400, 'Something went wrong in product add');
});

export default {
    create
};
