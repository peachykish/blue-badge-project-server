const jwt=require("jsonwebtoken");
const User=require("../db").import("../models/user");

const validateSession=(req,res,next)=>{
    const token=req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err,decodedToken) => {
        if(!err&&decodedToken){
            User.findOne({where:{id:decodedToken.id}})
            .then((user)=>{
                if(!user) throw err;
                req.user=user;
                next();
            })
            .catch((err)=>res.status(500).json({error:err}))
        } else {
            return res.status(401).json({message:"Not authorized",error:err});
        }
    });
}

module.exports=validateSession;