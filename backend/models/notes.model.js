import mongoose from "mongoose";
const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        default: "Enter here!"
    }
},{timestamps: true})

const Note = mongoose.model("Note", notesSchema);

export {Note};