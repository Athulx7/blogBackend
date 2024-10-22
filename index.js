const router = require('./Router/router')
require('dotenv').config()

const express = require('express')
require('./DB/connection')

const cors = require('cors')

const blogServer = express()

blogServer.use(cors())

blogServer.use(express.json())
blogServer.use(router)

blogServer.use('/uploads',express.static('./uploads'))

const PORT = 4001;

blogServer.listen(PORT,()=>{
    console.log(`blogServer is running in PORT ${PORT}`)
})

blogServer.get('/',(req,res)=>{
    res.send('hai expres server is working')
})