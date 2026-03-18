const bcrypt=require('bcrypt');
const {UserModel}  = require("../Models/User");
const jwt =require('jsonwebtoken');
const mongoose = require("mongoose");

const signup=async(req,res)=>{
    try{
        const{name, email , password}=req.body;
        console.log(req.body)
        
        const user=await UserModel.findOne({email});        
        if(user){
            return res.status(409)
            .json({message:"user is already registed , you can Login",success:false})
        }
        const userModel=new UserModel({name, email, password});        
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
          console.log("User Saved Successfully");
        res.status(201)
        .json({message:"signup successfull",
            success:true,   
        })

    }catch(error){
        res.status(500)
        .json({message:"internal setver error", success : false }  )
    }
}
const login=async(req,res)=>{
    try{
        const{email , password}=req.body;
        const user=await UserModel.findOne({email});
        
        const errorMsg= "Auth failed Email or passward is wrong"
        if(!user){
            return res.status(403)
            .json({message: errorMsg ,success:false})
        }
        const isPassword = await bcrypt.compare(password,user.password)
        if (!isPassword){
            return res.status(403)
            .json({message: errorMsg ,success:false})
        }
        const jwttoken=jwt.sign(
             { 
                email: user.email,
                _id: user._id,
                role: user.role  
                },
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        
        res.status(200)
        .header("Authorization", `${jwttoken}`)
            .json({
                message:"Login Success",
                success:true,
                jwttoken,
                email,
                role:user.role,
                name:user.name
            })
    }catch(error){
        res.status(500)
        .json({message:"internal setver error", success : true }  )
    }
}
module.exports={
    signup,
    login,
}