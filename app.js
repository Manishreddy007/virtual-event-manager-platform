require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();
const userRoutes = require("./routes/userRoutes");  
const eventRoutes = require("./routes/eventRoutes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users",userRoutes);
app.use("/events",eventRoutes);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connected to DB');
    app.listen(PORT,()=>{
        console.log("server lisenting to 3000")
    })
}).catch((err)=>{
    console.log(err.message);
});





