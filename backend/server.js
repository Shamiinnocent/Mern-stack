const express= require('express');
const dotenv =require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const Port = process.env.PORT
const cors = require('cors')
const workoutRoutes = require('./Routes/workouts')
const database = process.env.DATABASE;
const userRoutes = require('./Routes/user');

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
app.use(cors())
app.use(express.json())//see if any request coming have a body and if it does it passes it to the request Body so we can access it by a request handeler 
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes);

app.use((err, req, res, next) => {
    console.log(err.message);
    next()
})
//connect to db
mongoose.connect(database)
.then(()=>{
    app.listen(Port,()=>{
        console.log(`App running on Port ${Port} and connected to the database`);
    })
        
})
.catch((error)=>{console.log(error)})
   
