import express from "express";
import {  getFriendUsers, getGlobalUsers } from "../controller/getUser.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const router = express.Router();

router.get("/getGlobalUsers", protectRoute, getGlobalUsers);
router.get("/getUsers", protectRoute,  getFriendUsers);

export default router;
