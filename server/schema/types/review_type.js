const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const Review = mongoose.model("reviews");

const ReviewType = new GraphQLObjectType({
  name: "ReviewType",
  fields: () => ({
    _id: { type: GraphQLID },
    body: { type: GraphQLString },
    rating: { type: GraphQLInt },
    restaurant: {
      type: require("./restaurant_type"),
      resolve(parentValue) {
        return Review.findRestaurant(parentValue._id);
      }
    },
    user: {
      type: require("./user_type"),
      resolve(parentValue) {
        return Review.findUser(parentValue._id);
      }
    }
  })
});

module.exports = ReviewType;