import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { authUser } from "../middlewares/require-auth.js";
const router = express.Router();

router.get("/", async (req, res) => {
    res.json({ msg: "hello" })
})

router.post("/users/signup", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        throw new Error('username already in use.');
    }

    const user = await User.create({ username: username, password: password });
    // await user.create({ username, password });

    // const userJwt = jwt.sign({
    //     id: user._id,
    //     username: user.username
    // }, process.env.JWT_KEY);
    // console.log("uesejwt : ", userJwt);
    // res.cookie('userJwt', userJwt);

    res.status(201).send(user);
})

router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username: username });

        if (!existingUser || existingUser.password != password) {
            throw new BadRequestError('Invalid credentials');
        }

        const userJwt = jwt.sign({
            id: existingUser._id,
            username: existingUser.username
        }, process.env.JWT_KEY);
        console.log("uesejwt : ", userJwt);
        res.cookie('userJwt', userJwt);

        res.status(200).send(existingUser);
    } catch (error) {
        console.log(error);
    }
})

router.get("/test", authUser, async (req, res) => {
    try {

        res.status(200).json("hehehe");
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "something went wrong" })
    }

})

router.get("/logout", async (req, res) => {
    req.cookies.userJwt = "";
    res.status(200)
})

export { router as router }