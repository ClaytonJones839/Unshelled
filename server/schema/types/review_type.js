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
    })
});

module.exports = ReviewType;