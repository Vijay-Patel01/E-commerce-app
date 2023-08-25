import express from 'express';
import validation from '../../dto/adminValidation';
import vendorController from '../../controllers/Admin/vendorController';
import authController from '../../controllers/Admin/authController';
import auth from '../../middleware/auth';
const router = express.Router();

router.post('/login',validation.vendorLoginValidation,authController.vendorLogin);
router.post('/',auth.isLoggedIn,auth.restrictTo('admin'),validation.vendorAddValidation, vendorController.create);
router.get('/',auth.isLoggedIn,auth.restrictTo('admin'),vendorController.getAllVendor);
router.get('/:id',auth.isLoggedIn,auth.restrictTo('admin'),vendorController.getOneVendor);
router.patch('/:id',auth.isLoggedIn,auth.restrictTo('admin'),validation.vendorUpdate,vendorController.updateVendor);
router.delete('/:id',auth.isLoggedIn,auth.restrictTo('admin'),vendorController.deleteVendor);

export default router;

