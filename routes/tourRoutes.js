import express from 'express';
import { getAllTours, createTour, getTour, updateTour, deleteTour, checkBody, checkId } from '../controllers/tourController.js';
const router = express.Router();


router.param('id', checkId);
router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour).put(updateTour).delete(deleteTour);

export default router;