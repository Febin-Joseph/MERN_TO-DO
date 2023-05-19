const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const donenv = require('dotenv').config();
const app = express()
const todoRoutes = require('./routes/todo');
const port = 4000


//Middleware
app.use(express.json());
app.use(cors());
app.use('/api/v1/task', todoRoutes);


//MONGODB CONNECTION
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then((conn) => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})

//STARTING THE SERVER
app.listen(process.env.PORT, (req, res) => {
    console.log(`server started on port :  ${port}`)
})