import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
})

const Post = mongoose.model('Post', postSchema);

export {
    Post
}