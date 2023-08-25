import express from 'express';
import authRoute from './admin/authRoute';
import vendorRoute from './admin/vendorRoute';
import productRoute from './api/productRoute';

const router = express.Router();

router.use('/api/user', authRoute);
router.use('/api/vendor', vendorRoute);
router.use('/api/product',productRoute);

export default router;