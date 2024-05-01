import express from "express";
import { signup, login , getUser, logout } from "../controller/auth.controller.js"; 

const router  = express.Router();

router.post('/login',login);
router.get('/getUser' , getUser);
router.post('/signup' , signup , async(req , res)=>{
    try {
        
    } catch (error) {
        console.log(error.message);
        res.status(404).json({error:error.message})
    }
});
router.post('/logout' , logout);

export default router;