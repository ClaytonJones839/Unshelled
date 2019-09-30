const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  body: {
    type: String
    // required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
    // default: 3
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "restaurants"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

ReviewSchema.statics.findUser = function(userId) {
  return this.findById(userId)
    .populate("user")
    .then(review => review.user);
};

ReviewSchema.statics.findRestaurant = function(reviewId) {
  return this.findById(reviewId)
    .populate("restaurant")
    .then(review => review.restaurant);
};

ReviewSchema.statics.updateReviewRestaurant = (reviewId, restaurantId) => {
  const Review = mongoose.model("reviews");
  const Restaurant = mongoose.model("restaurants");

  return Review.findById(reviewId).then(review => {
    return Restaurant.findById(restaurantId).then(newRestaurant => {
      review.restaurant = newRestaurant;
      newRestaurant.reviews.push(review);

      return Promise.all([review.save(), newRestaurant.save()]).then(
        ([review, newRestaurant]) => review
      );
    });
  });
};

module.exports = mongoose.model("reviews", ReviewSchema);