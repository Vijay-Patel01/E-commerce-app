import express from 'express';
import controller from '../../controllers/productController';
import validation from '../../dto/productValidation';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/',auth.isLoggedIn,validation.createValidation,controller.create);

export default router;