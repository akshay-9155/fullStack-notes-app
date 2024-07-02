import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";


const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_URI}/${DATABASE_NAME}`);
        console.log("MongoDB connected !! DB HOST : " + connectionInstance.connection.host); 
    } catch (error) {
        console.log("MongoDB connection FAILED " + error);
        process.exit(1);
    }
}

export default connectDb;