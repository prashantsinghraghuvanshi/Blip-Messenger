import express from "express";
import { signup, login , getUser, logout } from "../controller/auth.controller.js"; 

const router  = express.Router();

router.post('/login',login);
router.get('/getuser' , getUser);
router.post('/signup' , signup);
router.post('/logout' , logout);

export default router;