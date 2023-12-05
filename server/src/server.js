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
        origin: 'http://localhost:3000',
        credentials: true,
    }))

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

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