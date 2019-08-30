const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const Taco = mongoose.model("tacos");

const TacoType = new GraphQLObjectType({
    name: "TacoType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        style: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLInt },
        price: { type: GraphQLInt },
        category: {
            type: require("./restaurant_type"),
            resolver(parentValue) {
                return Product.findById(parentValue._id)
                    .populate("restaurant")
                    .then(taco => {
                        return taco.restaurant;
                    });
            }
        }

    })
});

module.exports = TacoType;
