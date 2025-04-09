const express = require("express");
const router = express.Router();

const {authMiddleware,roleMiddleware} = require("../middlewares/auth");
const {getAllEvents,createEvent,updateEvent,deleteEvent,registerForEvent} = require("../controllers/eventController");

router.get("/",getAllEvents);
router.post("/",authMiddleware,roleMiddleware(["admin"]),createEvent);  
router.put("/:id",authMiddleware,roleMiddleware(["admin"]),updateEvent);
router.delete("/:id",authMiddleware,roleMiddleware(["admin"]),deleteEvent); 
router.post("/:id/register",authMiddleware,registerForEvent);
module.exports = router;