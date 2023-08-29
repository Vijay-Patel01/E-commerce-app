import express from 'express';
import controller from './product.controller';
import validation from '../../dto/product.validation';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/',auth.isLoggedIn,auth.vendorOnly,validation.createValidation,controller.create);
router.get('/',auth.isLoggedIn,controller.getAllProducts);
router.get('/:id',auth.isLoggedIn,controller.getOneProduct);
router.patch('/:id',auth.isLoggedIn,auth.vendorOnly,validation.ProductUpdate,controller.updateProduct);
router.delete('/:id',auth.isLoggedIn,auth.vendorOnly,controller.deleteProduct);

export default router;