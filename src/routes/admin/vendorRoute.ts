import express, { Express, Request, Response, NextFunction } from 'express';
import validation from '../../middleware/dto/adminValidation';
import vendorController from '../../controllers/Admin/vendorController';
import authController from '../../controllers/Admin/authController';
import auth from '../../middleware/auth';
const router = express.Router();

router.post('/',auth.isLoggedIn,auth.restrictTo('admin'),validation.vendorAddValidation, vendorController.create);
router.post('/login',validation.vendorLoginValidation,authController.vendorLogin);

export default router;

