const http = require('http')
const app = require('./routes/Route')
const server = http.createServer(app)
const dotenv = require('dotenv')
dotenv.config()

server.listen (process.env.PORT, ()=>{
    console.log(`Server is running: http://localhost:${process.env.PORT}/`);
})