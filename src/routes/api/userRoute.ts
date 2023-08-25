import express from 'express';
import controller from '../../controllers/userController';
import auth from '../../middleware/auth';
import validation from '../../dto/adminValidation';

const router = express.Router();

router.get('/',auth.isLoggedIn,auth.restrictTo('admin'),controller.getAllUsers);
router.get('/me',auth.isLoggedIn,controller.me);
router.patch('/updateMe',auth.isLoggedIn,validation.userUpdate,controller.updateMe);
router.get('/:id',auth.isLoggedIn,auth.restrictTo('admin'),controller.getOneUser);
router.delete('/:id',auth.isLoggedIn,auth.restrictTo('admin'),controller.deleteUser);
router.patch('/:id',auth.isLoggedIn,auth.restrictTo('admin'),validation.userUpdate, controller.updateUser);

export default router;