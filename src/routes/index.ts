import express from 'express';
import authRoute from './admin/authRoute';
import userRoute from './api/userRoute';
import vendorRoute from './admin/vendorRoute';
import productRoute from './api/productRoute';

const router = express.Router();

router.use('/api/auth', authRoute);
router.use('/api/user', userRoute);
router.use('/api/vendor', vendorRoute);
router.use('/api/product',productRoute);

export default router;