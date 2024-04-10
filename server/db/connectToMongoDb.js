import  Mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:'../.env'})


const connectToMongoDb =async()=>{
    try {
        await Mongoose.connect(process.env.MONGO_DB_URI);
        console.log('db connected successfuly');
    } catch (error) {
        console.log(error.message);
    }
}

export default connectToMongoDb