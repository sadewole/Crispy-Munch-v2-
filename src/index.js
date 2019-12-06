import express from 'express'
import logger from 'morgan'


const app = express()

// middlewares
app.use(logger())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// routes



const PORT = 5000
// listen to server
app.listen(PORT, console.log(`Server running on ${PORT}`))