const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const TacoType = require("./taco_type");
const RestaurantType = require("./restaurant_type");
const TacoCheckinType = require("./checkin_type");

const User = mongoose.model("users");
const Taco = mongoose.model("tacos");
const Restaurant = mongoose.model("restaurants");
const TacoCheckin = mongoose.model("tacoCheckins");

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return User.findById(args._id);
            }
        },
        tacos: {
            type: new GraphQLList(TacoType),
            resolve(_, args) {
                return Taco.find({});
            }
        },

        tacoCheckin: {
            type: new GraphQLList(TacoCheckinType),
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                console.log('hello');
                return [TacoCheckin.findById(args._id)];
            }
        },

        taco: {
            type: TacoType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Taco.findById(args._id);
            }
        },
        restaurants: {
            type: new GraphQLList(RestaurantType),
            resolve(_, args) {
                return Restaurant.find({});
            }
        },
        restaurant: {
            type: RestaurantType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Restaurant.findById(args._id);
            }
        },
    })
});

module.exports = RootQueryType;