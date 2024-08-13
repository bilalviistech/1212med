const express = require('express')
const app = express()
const db = require('../config/ConnectDB')
const cors = require('cors')
const bodyParser = require('body-parser')
const Auth = require('../middleware/AuthMiddleware')
const AuthRoute = require('../controllers/AuthController')
db()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()) 

//Routes
app.post('/add-user', AuthRoute.AddUser)
app.post('/login', AuthRoute.Login)
app.post('/user-profile', Auth, AuthRoute.UserProfile)
// app.use('/uploads', express.static('uploads'));

// Bad Request
app.use((req,res,next)=>{
    res.status(400).json({
        message : 'Bad request.'
    })
})

module.exports = app