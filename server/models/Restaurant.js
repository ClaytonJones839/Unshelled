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