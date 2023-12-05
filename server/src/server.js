import express from "express";
const app = express();
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

app.use(express.json());
app.use(cookieParser())
app.use(cors(
    {
        origin: '*',
        credentials: true,
    }))

const startDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DB.');
    } catch (error) {
        console.log(error);
    }
}
startDB();

import { router } from "./routes/index.js";
import { postRouter } from "./routes/posts.js";
app.use(router);
app.use("/post", postRouter);
const PORT = process.env.PORT || 4000
app.listen(PORT, () => { console.log("started on 4000"); })