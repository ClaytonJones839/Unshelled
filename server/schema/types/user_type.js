const graphql = require("graphql");
const mongoose = require("mongoose");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;
const Taco = mongoose.model("tacos");
const User = mongoose.model("users");

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
        loggedIn: { type: GraphQLBoolean },
        photo: { type: GraphQLString },
        tacoCheckin: {
            type: new GraphQLList(require("./checkin_type")),
            resolve(parentValue) {
                return User.findTacoCheckins(parentValue._id)
            }
        }
    }
});

module.exports = UserType;
