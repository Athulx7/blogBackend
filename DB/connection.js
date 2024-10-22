const mongoose = require('mongoose')

const connectionString = process.env.DATA_BASE

mongoose.connect(connectionString).then((res) => {
    console.log("mongo db connected succesfully")
}).catch((err) => {
    console.log("mongo db connnection faild")
    console.log(err)
})