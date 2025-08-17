import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    transcript: { type: String }, // extracted text from any file format
    title: { type: String, required: true, trim: true },
    aiSummary: { type: String },
    meetingDate: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Note', noteSchema); 
