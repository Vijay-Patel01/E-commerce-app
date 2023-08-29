import express from 'express';
import validation from '../../dto/admin.validation';
import vendorController from './vendor.controller';
import authController from '../user/auth/auth.controller';
import auth from '../../middleware/auth';
const router = express.Router();

router.get('/myProducts',auth.isLoggedIn,auth.vendorOnly,vendorController.getMyProduct);
router.get('/',auth.isLoggedIn,auth.adminOnly,vendorController.getAllVendor);
router.get('/:id',auth.isLoggedIn,auth.adminOnly,vendorController.getOneVendor);
router.post('/login',validation.vendorLoginValidation,authController.vendorLogin);
router.post('/',auth.isLoggedIn,auth.adminOnly,validation.vendorAddValidation, vendorController.create);
router.patch('/:id',auth.isLoggedIn,auth.adminOnly,validation.vendorUpdate,vendorController.updateVendor);
router.delete('/:id',auth.isLoggedIn,auth.adminOnly,vendorController.deleteVendor);


export default router;

