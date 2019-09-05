const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    facebookLink: {
        type: String,
        required: true
    },
    twitterLink: {
        type: String,
        required: true
    },
    instagramLink: {
        type: String,
        required: true
    },
    destinationLink: {
        type: String,
        required: true
    },
    homepageLink: {
        type: String,
        required: true
    },
    tacos: [
        {
            type: Schema.Types.ObjectId,
            ref: "tacos"
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "reviews"
        }
    ]
});

RestaurantSchema.statics.findTacos = function (restaurantId) {
    return this.findById(restaurantId)
        .populate("tacos")
        .then(restaurant => restaurant.tacos);
};

RestaurantSchema.statics.findReviews = function (restaurantId) {
    return this.findById(restaurantId)
        .populate("reviews")
        .then(restaurant => restaurant.reviews);
};

module.exports = mongoose.model("restaurants", RestaurantSchema);