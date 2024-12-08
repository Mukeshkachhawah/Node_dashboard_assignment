const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const cors = require('cors')
const {auth} = require('./middlewares/auth')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongo is connected")
}).catch(()=>{
    console.log('error in connecting mongo')
})

app.use('/api/auth',authRoutes)
app.use('/api/',auth,taskRoutes)


app.listen(process.env.PORT, ()=>{
    console.log("port is running")
})