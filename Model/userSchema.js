const mongoose = require('mongoose')

//create schema 
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        uniqu:true,

    },
    password:{
        type:String,
        require:true
    }
})




//create model
const users = mongoose.model("users",userSchema)


module.exports = users


