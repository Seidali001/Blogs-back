import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true,
            unique: true
        },
        tags: {
            type: Array,
            default: []
        },
        viewsCount: {
            type: Number,
            default: 0
        },
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Comment",
                    required: false
                },
                avatarUrl: {
                    type: String,
                    ref: "Comment",
                    required: false
                },
                fullName: {
                    type: String,
                    ref: "Comment",
                    required: false
                },
                content: {
                    type: String,
                    ref: "Comment",
                    required: false
                }
            }
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Post", PostSchema)