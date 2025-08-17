
import express from 'express';
import multer from 'multer';
import { uploadTranscript, editNote, shareNote,getAllNotes, deleteNote } from '../controller/note.controller.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { get } from 'mongoose';

const noteRouter = express.Router();


noteRouter.post("/", auth,  uploadTranscript);
noteRouter.get("/", auth, getAllNotes);
noteRouter.put("/:id", auth, editNote);
noteRouter.delete("/:id", auth, deleteNote);
noteRouter.post("/:id/share", auth, shareNote);

export default noteRouter;
