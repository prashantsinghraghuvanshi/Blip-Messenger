import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from"./routes/message.routes.js";
import userRoutes from './routes/getUser.routes.js';
import connectToMongoDb from "./db/connectToMongoDb.js";

const app   =express();
const PORT  = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming request with json payloads from req.body 
app.use(cookieParser())
app.use("/api/auth" , authRoutes)
app.use("/api/messages" , messageRoutes)
app.use("/api/getUsers" , userRoutes)
// app.get("/" , (req , res)=>{
//     res.send("hello world//////")
// })

app.listen(PORT , ()=> {
    connectToMongoDb();
console.log(`server running on port ${PORT}`);
});