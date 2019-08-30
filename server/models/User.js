const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 32
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("users", UserSchema);

// To do:
// Add location
// Gender