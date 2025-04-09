const eventModel = require('../models/eventModels'); 
const {sendEmail} = require("../util/sendEmail");;
const {eventRegistrationMessage} = require("../messageTemplates/eventRegistrationMessage");
const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
  
const createEvent = async (req, res) => {
    try{
        const {title, description, date, time} = req.body;
        if(req.user.role != "admin"){
            return res.status(403).send({msg:"You are not authorized to create an event"});
        }
        if(!title || !description || !date || !time){
            return res.status(400).send({msg:"All fields are required"});
        }
        const event = await eventModel.create({
            title,
            description,
            date,
            time,
            createdBy:req.user._id
        });
        res.status(201).send({msg:'Event created successfully', event});
    }catch(error){
        res.status(500).send({msg:error.message});
    }
}

const updateEvent = async (req, res) => {
    try{
        const {id} = req.params;
        const updateEvent = req.body;

        const event = await eventModel.findById(id);

        if(!event || event.isDeleted === true){
            return res.status(404).send({msg:"Event not found"});
        }
        if(req.user.role != "admin"){
            return res.status(403).send({msg:"You are not authorized to update this event"});
        }
        Object.assign(event, updateEvent);
        event.modifiedBy = req.user._id;
        event.modifiedAt = new Date();
        await event.save();
        res.status(200).send({msg:"Event updated successfully", event});
    }catch(error){
        res.status(500).send({msg:error.message});
    }
}

const deleteEvent = async (req, res) => {
    try{
        const {id} = req.params;
        const event = await eventModel.findById(id);
        if(!event || event.isDeleted === true){
            return res.status(404).send({msg:"Event not found"});
        }
        if(req.user.role !== "admin"){
            return res.status(403).send({msg:"You are not authorized to delete this event"});
        }
        await eventModel.deleteOne(event);
        res.status(200).send({msg:"Event deleted successfully"});
    }catch(error){
        res.status(500).send({msg:error.message});
    }
}
const registerForEvent = async(req, res) => {
    try{
        const {id} = req.params;
        const event = await eventModel.findById(id);
        const {title,date,time} = event;    
        if(!event){
            return res.status(404).send({msg:"Event not found"});
        }
        if(event.participants.includes(req.user._id)){
            return res.status(400).send({msg:"You are already registered for this event"});
        }
        event.participants.push(req.user._id);

        await event.save();
        await sendEmail(req.user.email,`You have successfully registered for the event ${title}`,eventRegistrationMessage(req.user.username,title,date,time));
        res.status(200).send({msg:"You have successfully registered for the event", event});
        
    }catch(error){
        res.status(500).send({msg:error.message});
        
    }
}

module.exports ={
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent
}

