const express = require("express");
const tickets = require("../controllers/ticketController");

const router = express.Router();

// api for tickets
router.route("/createTicket").post(tickets.createTicket);
router.put("/updateTicketById/:id", tickets.updateTicketById);
router.delete("/deleteTicketById/:id", tickets.deleteTicketById);
router.get("/getTicketsByStatus/:status", tickets.getTicketsByStatus);

module.exports = router;
