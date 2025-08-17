import Router from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        console.log(name, email, password  );
        
        const hashedPass =await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPass });
        // fire inngest
        // await inngest.send({
        //     name: 'user/signup',
        //     data: { email }
        // });

        const token = jwt.sign({
            _id: user._id
        },
            process.env.JWT_SECRET);

        return res.status(200).json({ user, token });

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: "Signup falied", details: error.message });
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email or password required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatched =await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Invalid credentials. Try again!" });
        }

        const token = jwt.sign({
            _id: user._id
        },
            process.env.JWT_SECRET);

        return res.status(200).json({ user, token, message: "Login successful" });

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: "Login falied", details: error.message });
    }

}

export const logout = async (req, res) => {

    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token) return res.status(401).json({ error: "Unauthorized" });

        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(401).json({ error: "Unauthorized" })
            }
        });
        return res.status(200).json({ message: "Logout successfully" });

    }catch(error){
        return res.status(500).json({ error: "Logout failed", details: error.message });
    }
}

