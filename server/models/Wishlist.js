const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
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
    },
    photo: {
        type: String
    },
    wishlist_items: [
        {
            type: Schema.Types.ObjectId,
            ref: "tacos"

        }
    ],
    tacoCheckin: [{
        type: Schema.Types.ObjectId,
        ref: "tacoCheckins"
    }]
});

module.exports = mongoose.model("wishlists", WishlistSchema);

// To do:
// Add location
// Gender