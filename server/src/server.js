import express from "express";
const app = express();
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

app.use(express.json());
app.use(
    cookieParser()
)

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

app.listen(4000, () => { console.log("started on 4000"); })