const {
    Ticket
} = require("../models/ticket.models");
const {
    validationResult
} = require('express-validator');

const responseHelpers = require('../helpers/response.helpers');
const {
    mongo
} = require("mongoose");

// api to create ticket
exports.createTicket = async(req, res) => {
    try {
        validationResult(req).throw();
        const {
            title,
            description,
            ticket_raise_by,
            priority,
            status
        } = req.body;

        let ticket = await Ticket.create({
            title,
            description,
            ticket_raise_by,
            priority,
            status
        });

        res.send(responseHelpers.successMessage(ticket, res, 200, "Ticket Added Successfully!"));
    } catch (err) {
        responseHelpers.errorMessage(err, res, 400)
    }

};
// update api
exports.updateTicketById = async(req, res) => {
    try {
        validationResult(req).throw();

        await Ticket.find({
            "_id": new mongo.ObjectID(req.params.id)
        }, (error, result) => {
            //res.send(result)
            if (error) {
                responseHelpers.errorMessage(error, res, 400)
            };
            if (result) {
                const updateData = {
                    title: req.body.title,
                    description: req.body.description,
                    ticket_raise_by: req.body.ticket_raise_by,
                    priority: req.body.priority,
                    status: req.body.status
                };

                Ticket.update({
                    "_id": new mongo.ObjectID(req.params.id)
                }, {
                    $set: updateData
                }).then(result => {
                    res.send(responseHelpers.successMessage(null, res, 200, "Ticket Status Updated Successfully!"));
                }).catch(err => {
                    responseHelpers.errorMessage(err, res, 400)
                });

            }
        })
    } catch (error) {
        responseHelpers.errorMessage(error, res, 400);
    }
}

// Get open ticket
exports.getTicketsByStatus = async(req, res) => {
    try {
        let openTicket = await Ticket.find({
            "status": req.params.status
        }, (err, result) => {
            if (err) responseHelpers.errorMessage(err, res, 400)
            res.send(responseHelpers.successMessage(result, res, 200, "Ticket List!"));
        });
    } catch (err) {
        responseHelpers.errorMessage(err, res, 400)
    }
}

// Delete  ticket
exports.deleteTicketById = async(req, res) => {
    try {
        let openTicket = await Ticket.find({
            _id: new mongo.ObjectID(req.params.id)
        }, (err, result) => {
            if (err) responseHelpers.errorMessage(err, res, 400);
            if (result) {
                try {
                    Ticket.deleteOne({
                        "_id": new mongo.ObjectID(req.params.id)
                    }, (err) => {
                        responseHelpers.errorMessage(err, res, 400);
                    });
                    res.send(responseHelpers.successMessage(new mongo.ObjectID(req.params.id), res, 200, "Record Deleted Successfully!"));
                } catch (err) {
                    responseHelpers.errorMessage(err, res, 400);
                }


            }
        });
    } catch (err) {
        responseHelpers.errorMessage(err, res, 400);
    }
}