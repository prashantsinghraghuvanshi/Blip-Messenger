import express from "express";
import { signup, login , logout } from "../controller/auth.controller.js"; 

const router  = express.Router();

router.post('/login',login);
router.post('/signup' , signup);
router.post('/login' , logout);

export default router;