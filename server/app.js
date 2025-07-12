import { connectMongo } from "./dbcon.js";
import express from 'express';
import cors from 'cors';
import router from "./routes/MainRouts.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

dotenv.config();
const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());

app.use("/uploads/restaurants", express.static("uploads/restaurants"));
app.use("/uploads/dishes", express.static("uploads/dishes"));

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));
app.use(cookieParser())

app.use("/ots", router)

app.listen(PORT, () => {
    connectMongo();
    console.log(`App is running on http://localhost:${PORT}`);

});
