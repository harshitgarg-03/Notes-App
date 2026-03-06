import { noteSchemaProp } from "@/next-env";
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema<noteSchemaProp>({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    content: {
        type: String,
        required: true,
        maxlength: 2000
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.models.Note || mongoose.model("Note", noteSchema)