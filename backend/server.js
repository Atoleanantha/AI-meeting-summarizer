import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {auth} from "./middleware/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";
// Routes
app.use("/api/auth", userRouter);
app.use("/api/notes", noteRouter); 


await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));




