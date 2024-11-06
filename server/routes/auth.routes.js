import express from "express";
import { signup, login , getUser, logout , verifyEmail , callBackRoute, oAuth } from "../controller/auth.controller.js"; 

const router  = express.Router();

router.post('/login',login);
router.get('/getUser' , getUser);
router.post('/signup' , signup )
router.post('/logout' , logout);
router.post('/verifyEmail' , verifyEmail)
router.get('/:provider/callback', callBackRoute); 
router.get('/:provider/login' , oAuth)

export default router;