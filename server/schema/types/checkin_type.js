const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLFloat } = graphql;

// const Taco = mongoose.model("tacos");
// const Restaurant = mongoose.model('restaurants');
const TacoCheckin = mongoose.model("tacoCheckins");
const Taco = mongoose.model("tacos");
const User = mongoose.model("users");

const TacoCheckinType = new GraphQLObjectType({
    name: "TacoCheckinType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLInt },
        restaurant: { type: GraphQLInt },
        // restaurant: {
        //     type: require("./restaurant_type"),
        //     resolve(parentValue) {
        //         return TacoCheckin.findRestaurant(parentValue._id)
        //     }
        // },
        taco: {
            type: require("./taco_type"),
            resolve(parentValue) {
                return Taco.findById
            }
        },
        // user: {
        //     type: require("./user_type"),
        //     resolve(parentValue) {
        //         return TacoCheckin.findUser(parentValue._id)
        //     }
        // }

    })
});

module.exports = TacoCheckinType;
