import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from"./routes/message.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";

const app   =express();
const PORT  = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming request with json payloads from req.body 
app.use("/api/auth" , authRoutes)
app.use("/api/message" , messageRoutes)
// app.get("/" , (req , res)=>{
//     res.send("hello world//////")
// })

app.listen(PORT , ()=> {
    connectToMongoDb();
console.log(`server running on port ${PORT}`);
});