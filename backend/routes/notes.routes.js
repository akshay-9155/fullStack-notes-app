import express from 'express';
import { Note } from '../models/notes.model.js';
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const data = req.body;
        if (!data.title) {
            console.log("Title empty!");
            res.status(406).json({ "error": "Note title should not be empty!" });
        }
        const newNote = new Note(data);
        const response = await newNote.save();
        res.status(200).json(response);
    } catch (error) {
        console.log("Server Error!");
        res.status(500).send(error);
    }
});

router.get("/view", async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.log("Server Error!");
        res.status(500).send(error);
    }
})

router.get("/find", async (req, res) => {
    try {
        const { title } = req.body;
        const foundNotes = await Note.find({ title: title });
        res.status(200).json(foundNotes);
    } catch (error) {
        console.log("Server Error!");
        res.status(500).send(error);

    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            res.status(404).json({ "Error": "Note not Found" })
        }
        res.status(200).json({ "Message": "Note successfully deleted!" })
    } catch (error) {
        console.log("Server Error!");
        res.status(500).send(error);

    }
})

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedData = await Note.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        })
        if (!updatedData) {
            res.status(404).json({ "Error": "Note not Found" })
        }
        res.status(200).json({ "message": "Note updated successfully!" })
    } catch (error) {
        console.log("Server Error!");
        res.status(500).send(error);
    }
})


export { router };