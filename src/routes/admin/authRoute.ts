import express, { Express, Request, Response, NextFunction } from 'express';
import validation from '../../middleware/dto/adminValidation';
import authController from '../../controllers/Admin/authController';
const router = express.Router();

router.post('/signup',validation.authValidation, authController.signup);
router.post('/login',validation.loginValidation, authController.login);

export default router;
