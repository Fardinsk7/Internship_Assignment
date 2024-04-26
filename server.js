const express = require('express');
const cors = require('cors');
const connectToMongodb = require('./database/connect');

//Initializing express
const app = express();

//Defining port
const port = process.env.PORT || 7000;

//Launching initial Middlewares
app.use(express.json());
app.use(cors());
app.disable('x-powered-by')//A Security Practice, avoid hackers

//API routes Initialized
app.use('/movie',require("./router/moviesRoutes"));

//Home route
app.get("/",(req,res)=>{
    res.send("Hello World")
})

//Initializing Database Connection if connected to Database then started Server 
connectToMongodb().then(()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server listening to http://localhost:${port} `);
        })
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}).catch(err=>{
    console.log(`Error: ${err}`)
})