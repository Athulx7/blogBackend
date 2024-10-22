const users = require('../Model/userSchema')
const jwt = require("jsonwebtoken")
exports.register = async (req, res) => {
    // console.log("inside user register controller")
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email: email })

        if (existingUser) {
            // console.log("account already exists")
            res.status(400).json("account already exist")
        }
        else {
            // console.log("account not exist")
            const newuser = new users({
                username: username,
                email: email,
                password: password
            });
            await newuser.save()
            res.status(201).json("user registration is successfull")

        }


    }
    catch (err) {
        res.status(401).json("registration request faild due to ", err)

    }
}


exports.userLogin = async (req, res) => {
    // console.log("inside user login contrller")
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email: email, password: password })
        if (existingUser) {
            const token = jwt.sign({userid:existingUser._id},"userpwd123")
            // console.log(token)
            res.status(200).json({ data: existingUser,token:token })
            // console.log(existingUser)
        }
        else {
            res.status(401).json("invalid email or password")
        }
    }
    catch (err) {
        res.status(401).json("internal server errror")
        console.log("login controller error", err)

    }
}