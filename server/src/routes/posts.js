import express from "express";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";
import { authUser } from "../middlewares/require-auth.js";
import { Comment } from "../models/Comment.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allPosts = await Post.find();
        console.log(req.user);
        res.status(200).json({ posts: allPosts })
    } catch (error) {
        console.log(error);
    }
})

router.post("/create", authUser, async (req, res) => {
    try {
        const { name, postContent } = req.body;

        const createdBy = req.user.id;

        const newPost = await Post.create({ name: name, postContent: postContent, createdBy: createdBy });

        res.status(201).send(newPost);
    } catch (error) {
        console.log(error);
    }
})

router.post("/comment", authUser, async (req, res) => {
    try {
        const { comment, postId } = req.body;
        const author = await User.findById(req.user.id);
        console.log(author);
        const newComment = await Comment.create({ postId: postId, comment: comment, userId: author.username });

        res.status(201).send(newComment);
    } catch (error) {
        console.log(error);
    }

})

router.get("/post/:id", authUser, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const post = await Post.findById(id);
        const author = await User.findById(post.createdBy);
        console.log(author.username);
        const comments = await Comment.find({ postId: id });

        const response = {
            post, comments, authorName: author.username
        }

        res.status(200).send(response)
    } catch (error) {
        console.log(error);
    }
})

export { router as postRouter }