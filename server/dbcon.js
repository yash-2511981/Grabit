import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();
const url = process.env.MONGODB_URL

export const connectMongo = () => {
    mongoose.connect(url).then((result) => {
        console.log("Database is connected")
    }).catch((err) => {
        console.log("error while connecting", err)
    });
} 
