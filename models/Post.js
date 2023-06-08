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
    /* tags: {
        type: Array,
        default: ["react", "redax", "node"]
    },  */
    tags: {
        type: mongoose.Schema.Types.Array, // Используем встроенную схему для массива тегов
        ref: "Tag",
        required: true
      },
    viewsCount: {
        type: Number,
        default: 0
    },
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