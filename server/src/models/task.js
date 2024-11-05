const { Schema } = require("mongoose");


const TaskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },  
    status: {
        type: String,
        required: true
    },
    username: {
        type: String,
        ref:"User",
        required: true
    },
    usersAssigned: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    }],
    date: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    }
});

module.exports = {
    TaskSchema
}