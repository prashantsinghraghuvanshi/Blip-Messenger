import express from 'express'
import getUser from '../controller/getUser.controller.js'
import protectRoute from '../middleware/protectRoutes.js';

const router = express.Router();

router.get('/' ,protectRoute, getUser);

export default router;