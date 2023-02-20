require('dotenv').config();
const cors = require('cors')
const express = require('express')
const db = require('./config/database')
const router = require('./routes/index')

const app = express();

try{
    db.sync();
    console.log("Database server is running")
}catch(error){
    console.log(error)
}

app.use(cors({
    Credential:true,
    origin:'http://localhost:3000'
}))
//parse requests of content-type - application.json
app.use(express.json()); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//Middleware

app.use(router);

app.listen(process.env.PORT,()=>{
    console.log('Server running at port 5000')
})