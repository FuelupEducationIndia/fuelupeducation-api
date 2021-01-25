const {
    Ticket
} = require("../models/ticket.models");
const {
    validationResult
} = require('express-validator');

const {
    errorHelpers
} = require('../helpers/errors.helpers');
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

        res.status(200).json({
            ticket,
        });

    } catch (error) {
        res.send(error);
        //errorHelpers.catchError(error, res);
    }

};
// update api
exports.updateTicketById = async(req, res) => {
    try {
        validationResult(req).throw();
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            ticket_raise_by: req.body.ticket_raise_by,
            priority: req.body.priority,
            status: req.body.status
        };

        await Ticket.update({
            "_id": new mongo.ObjectID(req.params.id)
        }, {
            $set: updateData
        }).then(result => {
            res.status(200).json({
                "status": 200,
                "message": "Ticket Status Updated Successfully!",
                "data": ""
            });
        }).catch(err => {
            res.status(400).json({
                "status": 400,
                "message": err
            });
        });


    } catch (error) {
        res.send(error);
    }
}

// Get open ticket
exports.getTicketsByStatus = async(req, res) => {
    try {
        let openTicket = await Ticket.find({
            "status": req.params.status
        }, (err, result) => {
            if (err) throw err;
            res.status(200).json({
                "status": 200,
                "message": "Ticket List!",
                "data": result
            });
        });
    } catch (err) {
        res.send(err)
    }
}

// Delete  ticket
exports.deleteTicketById = async(req, res) => {
    try {
        let openTicket = await Ticket.find({
            _id: new mongo.ObjectID(req.params.id)
        }, (err, result) => {
            if (err) throw err;
            if (result) {
                try {
                    Ticket.deleteOne({
                        "_id": new mongo.ObjectID(req.params.id)
                    }, (error) => {
                        res.status(400).json({
                            "status": 400,
                            "message": error
                        });
                    });
                    res.status(200).json({
                        "status": 200,
                        "message": "Record Deleted Successfully!",
                        "data": new mongo.ObjectID(req.params.id)
                    });
                } catch (e) {
                    res.status(400).json({
                        "status": 400,
                        "message": e
                    });
                }


            }
        });
    } catch (err) {
        res.send(err)
    }
}