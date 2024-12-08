const userModel = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const nodemailer = require('nodemailer')

exports.handleregister = async (req,res)=>{
    
    try{
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.json({message:"all fields are required"})
        }
        const userexisted =await userModel.findOne({email})
        if(userexisted){
            return res.json({message:"this email is already in use"})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashpassword = bcrypt.hashSync(password,salt)
        const newuser = await userModel.create({
            name,
            email,
            password:hashpassword
        })

        return res.json({message:"user registered successfully!",newuser})

    }catch(err){
        return res.json({error:"server error",err})

    }
}

exports.handlelogin = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(404).json({message:"all fields are required"})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const ismatch =await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(404).json({message:"password is wrong"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
        console.log(token)
        return res.status(200).json({message:"User Loggedin Successfully",token,userId:user._id})
        
    }catch(err){
        return res.status(500).json({error:"server error",err})
    }
}

exports.handleforgetpassword = async(req,res)=>{
    try{
        const {email} = req.body
        if(!email){
            return res.status(401).json({message:"email is required"})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({message:"invalid email"})
        }
        const otp = Math.floor(Math.random()*1000000).toString()
        const expiretime = moment().add(10,'minutes').toDate()

        user.otp = otp
        user.expire = expiretime
        await user.save()

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })

        const mailOption = {
            from: process.env.EMAIL_USER,
            to:email,
            subject:'otp for password reset',
            text:`this is otp for your password reset ${otp}, it is valid for 10 minutes`
        }

        transporter.sendMail(mailOption, function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent',info.response)
            }
        })
        return res.status(200).json({message:"an otp is sent to your email ",otp})

    }catch(err){
        return res.status(500).json({error:"server error",err})
    }
}

exports.handlereset = async (req, res) => {
    try {
        const { password, email, otp } = req.body;
        if (!email || !otp || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (otp !== user.otp) {
            return res.status(401).json({ message: "OTP is invalid" });
        }

        if (moment().isAfter(user.expire)) {
            user.otp = null;
            user.expire = null;
            await user.save();
            return res.status(401).json({ message: "OTP has expired" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await userModel.findOneAndUpdate({ email }, { password: hashPassword });

        user.otp = null;
        user.expire = null;
        await user.save();

        return res.status(200).json({ message: "Your password has been updated successfully" });

    } catch (err) {
        console.error("Error during password reset:", err); 
        return res.status(500).json({ error: "Server issue", details: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ userId: user._id });
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  };