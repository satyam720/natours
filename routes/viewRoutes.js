import express from 'express';
import { getOverviewView, getTourView } from '../controllers/viewsController.js';
const router = express.Router();

router.get('/', getOverviewView);

router.get('/tour/:slug', getTourView)


export default router;