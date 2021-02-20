const mongoos = require('mongoose');
// Schema to create ticket table
const ticketSchema = new mongoos.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        required: true
    },
    ticket_raise_by: {
        type: Number,
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    status: {
        type: String,
        enum: ['Pending', 'Progress', 'Solved'],
        default: 'Pending'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Ticket = mongoos.model('Ticket', ticketSchema);

module.exports.Ticket = Ticket;