import db from '../../database/config.database';
import response from '../../utils/response';
import  { Express, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import factory from '../../utils/factory';

const Product = db.products;

const fileStorage = multer.memoryStorage();

const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
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
    res.locals.product.vendorId = res.locals.vendor.id;
    const product = await Product.create(res.locals.product);
    if (product) {
        return response.response(res, 201, { product }, 'Product added successful');
    }
    return response.errorResponse(res, 400, 'Something went wrong in product add');
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const docs = await Product.findAll({where:{
        status:'active'
    }});
    return response.response(res, 201, { docs }, 'Data get successful');

});

const getOneProduct =  catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const doc = await Product.findOne({
        where: [{id},
        {status:'active'}]
    });
    if (!doc) {
        return response.errorResponse(res, 400, 'No data found with this id');
    }
    return response.response(res, 201, { doc }, 'Data get successful');
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const updateProduct = await Product.update(res.locals.product, {
        where: {id: req.params.id}
    });
    if (!updateProduct) {
        return response.errorResponse(res, 400, 'Something went wrong in product update');
        }
        const product = await Product.findOne({where:{
            id : req.params.id
        }});
        return response.response(res, 200, { product }, 'Product updated successful');
});

const deleteProduct = factory.deleteOne(Product);

export default {
    create,
    getAllProducts,
    getOneProduct,
    deleteProduct,
    updateProduct
};
