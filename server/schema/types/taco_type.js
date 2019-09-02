const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLFloat } = graphql;

const Taco = mongoose.model("tacos");
const Restaurant = mongoose.model('restaurants');

const TacoType = new GraphQLObjectType({
    name: "TacoType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        style: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLInt },
        price: { type: GraphQLInt },
        restaurant: {
            type: require("./restaurant_type"),
            resolve(parentValue) {
                return Taco.findRestaurant(parentValue._id)
            }
        }

    })
});

module.exports = TacoType;
