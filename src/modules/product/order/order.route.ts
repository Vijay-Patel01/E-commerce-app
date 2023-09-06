import express from 'express';
import controller from './order.controller';
import validation from '../../../dto/order.validation';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post('/',auth.isLoggedIn,validation.orderPlace,controller.placeOrder);

export default router;