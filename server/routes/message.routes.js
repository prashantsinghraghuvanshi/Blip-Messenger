import express from "express";
import { sendMessage, getMessage } from '../controller/message.controller.js';
 import protectRoutes from "../middleware/protectRoutes.js"; // Assuming a separate middleware file

const router = express.Router();

// Route for sending messages
router.post("/send/:id", protectRoutes,sendMessage); // Adjust route path as needed

// (Optional) Route for getting messages (example)
router.get("/get/:messageId", getMessage); // Adjust route path as needed

// Uncomment if you have user authentication middleware
// router.use(protectRoutes); // Apply authentication protection before handling requests

export default router;
