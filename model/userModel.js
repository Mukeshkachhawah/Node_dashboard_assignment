const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String
    },
    expire:{
        type:Date
    }
},{timestamps:true,versionKey: false})

const userModel = mongoose.model('Users',userSchema)

module.exports = userModel