const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLList } = graphql;

const Taco = mongoose.model("tacos");
const TacoCheckin = mongoose.model("tacoCheckins");
const Restaurant = mongoose.model('restaurants');

const TacoType = new GraphQLObjectType({
    name: "TacoType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        style: { type: GraphQLString },
        description: { type: GraphQLString },
        photo: { type: GraphQLString },
        rating: { type: GraphQLInt },
        price: { type: GraphQLInt },
        restaurant: {
            type: require("./restaurant_type"),
            resolve(parentValue) {
                return Taco.findRestaurant(parentValue._id)
            }
        },
        tacoCheckin: {
            type: new GraphQLList(require("./checkin_type")),
            resolve(parentValue) {
                return Taco.findTacoCheckins(parentValue._id)
            }
        }

    })
});

module.exports = TacoType;
