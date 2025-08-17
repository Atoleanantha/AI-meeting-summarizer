import { Router } from "express";
import { signup, login } from "../controller/user.controller.js"
import {auth} from "../middleware/auth.js"
const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", auth, signup);


// userRouter.post("/update-user", auth, updateUser);
// userRouter.get("/users", auth, getUsers);


export default userRouter;