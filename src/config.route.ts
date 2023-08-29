import express from 'express';
import authRoute from './modules/user/auth/auth.route';
import userRoute from './modules/user/user.route';
import vendorRoute from './modules/vendor/vendor.route';
import productRoute from './modules/product/product.route';
import cartRoute from './modules/product/cart/cart.route';

const router = express.Router();

router.use('/api/auth', authRoute);
router.use('/api/user', userRoute);
router.use('/api/vendor', vendorRoute);
router.use('/api/product',productRoute);
router.use('/api/cart',cartRoute);

export default router;