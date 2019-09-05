const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const UserType = require("./types/user_type");
const RestaurantType = require("./types/restaurant_type");
const TacoType = require("./types/taco_type");
const TacoCheckinType = require("./types/checkin_type");

const AuthService = require("./services/auth");

const User = mongoose.model("users");
const Taco = mongoose.model("tacos");
const Restaurant = mongoose.model("restaurants");
const TacoCheckin = mongoose.model("tacoCheckins");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register: {
            type: UserType,
            args: {
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                photo: {type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.register(args);
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.login(args);
            }
        },
        logout: {
            type: UserType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, args) {
                return AuthService.logout(args);
            }
        },
        verifyUser: {
            type: UserType,
            args: {
                token: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.verifyUser(args);
            }
        },
        newTaco: {
            type: TacoType,
            args: {
                name: { type: GraphQLString },
                style: { type: GraphQLString },
                photo: { type: GraphQLString },
                price: { type: GraphQLInt },
                description: { type: GraphQLString },
                restaurantId: { type: GraphQLID }
            },
            resolve(_, { name, style, price, photo, description, restaurantId}) {
                const newTaco = new Taco({ name, style, price, photo, description, restaurant: restaurantId })
                newTaco.save().then((response) => {
                    Taco.updateTacoRestaurant(newTaco._doc._id, restaurantId)
                })
            }
        },

        newTacoCheckin: {
            type: TacoCheckinType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                rating: { type: GraphQLInt },
                tacoId: { type: GraphQLID },
                userId: {type: GraphQLID}
                // restaurant: { type: GraphQLString },
                // user: {type: GraphQLString}
            },
            resolve(_, { description, rating, tacoId, userId }) {
                console.log(tacoId);
                return Taco.findById(tacoId).then((taco) => {
                    let name = taco.name;
                    let restaurant = taco.restaurant;

                    return User.findById(userId).then((user) => {
                        
                    
                        let tacoCheckin = new TacoCheckin({ name, restaurant, description, rating });
                        taco.tacoCheckin.push(tacoCheckin._id);
                        user.tacoCheckin.push(tacoCheckin._id);

                        return tacoCheckin.save().then(() => {
                            taco.save();
                            user.save();
                            return tacoCheckin;
                        })
                    })
                })
                // return new TacoCheckin({ name, description, rating }).save();
            }
        },

        deleteTaco: {
            type: TacoType,
            args: { _id: { type: GraphQLID } },
            resolve(_, { _id }) {
                return Taco.remove({ _id });
            }
        },
        updateTacoRestaurant: {
            type: TacoType,
            args: {
                tacoId: { type: GraphQLID },
                restaurantId: { type: GraphQLID }
            },
            resolve(_, { tacoId, restaurantId }) {
                return Taco.updateTacoRestaurant(tacoId, restaurantId);
            }
        },

        updateTacoCheckin: {
            type: TacoType,
            args: {
                tacoId: { type: GraphQLID },
                tacoCheckinId: {type: GraphQLID}
            },
            resolve(_, { tacoId, tacoCheckinId }) {
                return Taco.updateTacoCheckin(tacoId, tacoCheckinId);
            }
        },

        newRestaurant: {
            type: RestaurantType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                location: { type: GraphQLString }
            },
            resolve(_, { name, description, location }) {
                return new Restaurant({ name, description, location }).save();
            }
        },
        deleteRestaurant: {
            type: RestaurantType,
            args: { _id: { type: GraphQLID } },
            resolve(_, { _id }) {
                return Restaurant.remove({ _id });
            }
        }
    }
});

module.exports = mutation;