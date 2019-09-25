const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const Restaurant = mongoose.model("restaurants");

const RestaurantType = new GraphQLObjectType({
    name: "RestaurantType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLInt },
        location: { type: GraphQLString },
        facebookLink: { type: GraphQLString },
        twitterLink: { type: GraphQLString },
        instagramLink: { type: GraphQLString },
        homepageLink: { type: GraphQLString },
        destinationLink: { type: GraphQLString },
        photo: { type: GraphQLString },
        tacos: {
            type: new GraphQLList(require("./taco_type")),
            resolve(parentValue) {
                return Restaurant.findTacos(parentValue._id);
            }
        },
        reviews: {
            type: new GraphQLList(require('./review_type')),
            resolve(parentValue) {
                return Restaurant.findReviews(parentValue._id);
        }}
    })
});

module.exports = RestaurantType;