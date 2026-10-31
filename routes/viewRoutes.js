import express from 'express';
import { getLoginForm, getOverviewView, getTourView, } from '../controllers/viewsController.js';
import { isLoggedIn } from '../controllers/authController.js';


const router = express.Router();
router.use(isLoggedIn);
router.get('/', getOverviewView);
router.get('/tour/:slug', getTourView);
router.get('/login', getLoginForm)


export default router;