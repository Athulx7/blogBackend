const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    blogTitle :{
        type:String,
        require:true
    },
    blogDescription:{
        type:String,
        require:true
    },
    blogImage:{
        type:String,
        require:true
    },
    blogAuthorname:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

const blogs = mongoose.model("blogs",blogSchema)

module.exports = blogs