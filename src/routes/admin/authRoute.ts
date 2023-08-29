import express from 'express';
import validation from '../../dto/adminValidation';
import authController from '../../controllers/Admin/authController';
import auth from '../../middleware/auth';
const router = express.Router();

router.post('/signup', validation.authValidation, authController.signup);
router.post('/login', validation.loginValidation, authController.login);
router.post('/changePassword',auth.isLoggedIn, validation.changePassword, authController.changePassword);
router.get('/logout', auth.isLoggedIn, authController.logout);

export default router;
