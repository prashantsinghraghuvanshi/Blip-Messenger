import express from "express";
import { createGroup,addMember,sendMessage, groupDetails } from "../controller/group.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/", protectRoute,createGroup );
router.post("/:groupId/members", protectRoute,addMember );
router.post("/:groupId/messages", protectRoute,sendMessage );

router.get("/:groupId", protectRoute, groupDetails);

export default router;
