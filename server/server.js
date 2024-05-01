import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/getUser.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
import {app , server ,io} from './socket/socket.js'


const PORT = process.env.PORT || 5000;

dotenv.config();

// app.use(cors());

app.use(express.json()); // to parse the incoming request with json payloads from req.body
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/getUsers", userRoutes);
// app.get("/" , (req , res)=>{
//     res.send("hello world//////")
// })

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`server running on port ${PORT}`);
});
