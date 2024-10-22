const blogs = require("../Model/blogSchema")

exports.addBlog = async (req, res) => {
    console.log("add Blog controller")
    const userId = req.payload
    // console.log(userId)
    const blogImage = req.file.filename
    const { blogTitle, blogDescription, blogAuthorname } = req.body
    try {
        const existingBlog = await blogs.findOne({ blogDescription: blogDescription })
        if (existingBlog) {
            res.status(409).json("the blog is already exists")
        }
        else {
            const newBlog = new blogs({
                blogTitle,
                blogDescription,
                blogImage,
                blogAuthorname,
                userId
            })
            await newBlog.save();
            res.status(200).json("blog is uploaded successfully")
        }

    }
    catch (err) {
        res.status(401).json("blog upload is faild", err)

    }


}


//get 3 blog 

exports.getThreeBlog = async (req, res) => {
    // console.log("inside get three blog controller")
    try {
        const homeBlogs = await blogs.find().limit(3)
        res.status(200).json(homeBlogs)

    }
    catch (err) {
        res.status(401).json("get 3 blogs faild due to", err)
    }
}

//get all blogs 

exports.getAllblogs = async (req, res) => {
    // console.log("inside getallblogd controller")
    const searchKey = req.query.search
    // console.log(searchKey)
    const searchQuery = {
        $or: [
            {
                blogTitle: {
                    $regex: searchKey, $options: 'i'
                }
            }
        ]
    }
    try {
        const allBlogs = await blogs.find(searchQuery)
        res.status(200).json(allBlogs)
    }
    catch (err) {
        res.status(401).json("getiing all blogs is faild due to ", err)
    }
}

//getting user blogs

exports.getUserBlogs = async (req, res) => {
    // console.log("inside getuserblogs controller")
    const userId = req.payload
    try {
        const UserBlogs = await blogs.find({ userId: userId })
        res.status(200).json(UserBlogs)
    }
    catch (err) {
        res.status(401).json("getuserblogs faild due to ", err)
    }
}


//getselectedBlogs

exports.getSelectegBlog = async (req, res) => {
    // console.log("inside getselected controller")
    const { id } = req.params
    console.log(id)
    try {
        const selectedBlog = await blogs.findById(id)

        res.status(200).json(selectedBlog)


    }
    catch (err) {
        res.status(401).json("getting selected blog due to", err)
    }

}



//editblog

exports.editUserBlogs = async (req, res) => {
    // console.log("edit blog controller")
    const { id } = req.params
    // const userId = req.payload
    try{
        const getedit = await blogs.findById(id)
        res.status(200).json(getedit)
    }
    catch(err){
        res.status(401).json("errro",err)
    }
    
}


//delete blog 

exports.delteBlog = async(req,res)=>{
    // console.log("inside delete controller")
    const {id}= req.params
    try{
        const deltingblogs = await blogs.findByIdAndDelete({_id:id})
        res.status(201).json(deltingblogs)

    }
    catch(err){
        res.status(401).json(err)

    }
}