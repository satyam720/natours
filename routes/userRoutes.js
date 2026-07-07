import express from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  signup,
  updatePassword,
} from '../controllers/authController.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, updatePassword);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
export default router;
