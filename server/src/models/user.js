const {Schema} = require("mongoose");


const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: false
    }
});

module.exports = {
    UserSchema,
}