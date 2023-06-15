import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    avatarUrl: {
        type: String,
        required: false
    },
    fullName: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    }
});

export default mongoose.model("Comment", CommentSchema)
