const bcrypt = require("bcrypt");
const saltRounds = 10;
const userModel = require("../models/userModels");

const jwt = require("jsonwebtoken");

const JWTSECRET = process.env.JWTSECRET
const regUser = async(req , res)=>{
    try{
        const {username,email,password,role} = req.body;
        if(!username || !email || !password || !role){
            return res.status(400).send({msg:"All feilds are required"});
        }
        
        const userExists = await userModel.findOne({username});
        if(userExists){
            return res.status(400).send({msg:"An user with the same username already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,saltRounds);

        await userModel.create({
            username,
            email,
            password:hashedPassword,
            role
        })
      
        res.status(201).send({msg:"user registerd successfully"});

    }catch(error){
        res.status(500).send({msg:error.message})
    }
}

const loginUser = async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password ){
            return res.status(400).send({msg:"All feilds are required"});
        }
        const dbUser = await userModel.findOne({"username":username});
        if(!dbUser){
            res.status(400).send({msg:"user not found in Db"});
        }

        const passwordMatch = await bcrypt.compare(password,dbUser.password);

        if(!passwordMatch){
            res.status(400).send({msg:"Wrond password"});
        }

        const token = jwt.sign({userId:dbUser._id,email:dbUser.email,role:dbUser.role},JWTSECRET,{expiresIn:"1hr"});
        res.status(200).send({"token":token});

    }catch(err){
        res.status(500).send({msg:err.message})
    }
}

module.exports = {regUser,loginUser};


