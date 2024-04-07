import express from "express";
import { signup, login , logout } from "../controller/auth.controller.js"; 

const router  = express.Router();

router.get('/login',login);
router.get('/signup' , signup);
router.get('/login' , logout);

export default router;