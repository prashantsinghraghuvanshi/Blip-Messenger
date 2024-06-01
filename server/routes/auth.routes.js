import express from "express";
import { signup, login , getUser, logout , verifyEmail } from "../controller/auth.controller.js"; 

const router  = express.Router();

router.post('/login',login);
router.get('/getUser' , getUser);
router.post('/signup' , signup )
router.post('/logout' , logout);
router.post('/verifyEmail' , verifyEmail)

export default router;