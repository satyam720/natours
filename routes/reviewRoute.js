import express from 'express';
import {
  createReview,
  getAllReviews,
  getReview,
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .post(protect, restrictTo('user'), createReview)
  .get(getAllReviews);
router.route('/:id').get(getReview);

export default router;
