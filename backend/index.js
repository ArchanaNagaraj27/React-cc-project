const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require ("path");
const cors = require("cors");
const { type } = require("os");


app.use(express.json());
app.use(cors());


// Database Connection With MongoDB

mongoose.connect("mongodb+srv://sudhareshanv:vvas.123@cluster0.mw8vlii.mongodb.net/e-commerce");

//API Creation 

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Schema Creating for User Model 

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating EndPoint for Registering the user

app.post('/signup',async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }
    
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})

//creating endpoint for user login 

app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user) {
        const passCompare = req.body.password === user.password;
        if(passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else {
        res.json({success:false,errors:"Wrong Email Address"})
    }
})

    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
        else {
            try {
                const data = jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next();

            } catch (error) {
                res.status(401).send({errors:"Please authenticate using a valid token"})
            }
        }
    }

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+ port)
    }
    else{
        console.log("Error : "+ error)
    }
})