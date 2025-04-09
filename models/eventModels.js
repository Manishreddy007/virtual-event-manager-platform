const mongoose = require('mongoose');   
const { dropSearchIndex } = require('./userModels');

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    modifiedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    modifiedAt:{
        type:Date,
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
});

module.exports = mongoose.model("Event",eventSchema);