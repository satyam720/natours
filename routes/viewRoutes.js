import express from 'express';
import { getLoginForm, getOverviewView, getTourView } from '../controllers/viewsController.js';
const router = express.Router();

router.get('/', getOverviewView);
router.get('/tour/:slug', getTourView);
router.get('/login', getLoginForm)


export default router;