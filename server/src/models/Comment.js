import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        reqeuired: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

export {
    Comment
}