
import jwt from "jsonwebtoken";
export const auth=(req,res,next) => {
     try{
            const token = req.headers.authorization.split(" ")[1];
           
            
            if(!token) return res.status(401).json({ error: "Unauthorized" });
    
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                
                
                if(err){
                    return res.status(401).json({ error: "Unauthorized request." })
                }
                req.user=decoded;
            });
            next()
    
        }catch(error){
            console.log(error);
            
            return res.status(401).json({ error: "Invalid token" });
        }
}