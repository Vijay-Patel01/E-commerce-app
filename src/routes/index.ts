import express, { Express} from 'express';
import authRoute from './admin/authRoute';
import vendorRoute from './admin/vendorRoute';

const router = express.Router();

router.use('/api/user', authRoute);
router.use('/api/vendor', vendorRoute);

export default router;