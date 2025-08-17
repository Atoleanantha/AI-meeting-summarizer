
import Note from "../model/note.model.js";
import { generateSummary } from '../services/aiService.js';
import { sendSummaryEmail } from '../services/emailService.js';
import textract from "textract";
import fs from 'fs';



export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        console.log("Fetched Notes:", notes);

        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
}

export const uploadTranscript = async (req, res) => {
    const { prompt, title, textInput } = req.body; // ✅ accept direct text

    let extractedText = "";
    console.log(textInput);


    try {
        if (textInput) {
            // Case 3: Direct text input
            extractedText = textInput;
        } else {
            return res.status(400).json({ error: "No input provided (file or text)" });
        }

        console.log("Extracted Text:", extractedText);

        // ✅ Generate AI summary
        const aiSummary = await generateSummary(extractedText, prompt || "");

        console.log("AI Summary:", aiSummary);

        // ✅ Save to DB
        const note = await Note.create({
            transcript: extractedText,
            title: title || "Untitled Meeting",
            aiSummary,
            createdBy: req.user._id,
        });

        res.json(note);
    } catch (error) {
        console.error("Error uploading transcript:", error);
        res.status(500).json({ error: "Failed to process transcript" });
    } finally {
        // ✅ Delete uploaded file after processing
        // if (file && file.path) {
        //     fs.unlink(file.path, (err) => {
        //         if (err) console.error("Failed to delete uploaded file:", err);
        //     });
        // }
    }
};
// ✏️ Edit AI Summary
export const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { aiSummary, title } = req.body;

        if (!aiSummary || aiSummary.trim() === "") {
            return res.status(400).json({ error: "Summary text is required" });
        }

        const note = await Note.findOneAndUpdate(
            { _id: id, createdBy: req.user._id }, // ✅ only owner can edit
            { aiSummary,title },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ error: "Note not found or not authorized" });
        }

        res.json({ message: "Summary updated successfully", note });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📧 Share Note via Email
export const shareNote = async (req, res) => {
    try {
        const { id } = req.params;
        let { recipients } = req.body;
        console.log("Sharing note with ID:", id);

        console.log("Sharing note with recipients:", recipients);


        if (!recipients || recipients.length === 0) {
            return res.status(400).json({ error: "Recipients are required" });
        }

        // Convert string → array if needed
        if (typeof recipients === "string") {
            recipients = recipients.split(",").map(email => email.trim());
        }

        const note = await Note.findOne({ _id: id, createdBy: req.user._id }); // ✅ only owner can share
        if (!note) {
            return res.status(404).json({ error: "Note not found or not authorized" });
        }

        const mail = await sendSummaryEmail(recipients, note.title, note.aiSummary);

        console.log("Email sent successfully:", mail);

        res.json({ message: "Summary shared successfully", recipients });
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findOneAndDelete({ _id: id, createdBy: req.user._id });
        if (!note) {
            return res.status(404).json({ error: "Note not found or not authorized" });
        }

        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Failed to delete note" });
    }
}