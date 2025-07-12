import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();
const url = process.env.MONGODB_URL

export const connectMongo = () => {
    mongoose.connect(url).then((result) => {
        console.log("server is running on localhost:3000")
    }).catch((err) => {
        console.log("error while connecting", err)
    });
} 
