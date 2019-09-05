const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const UserType = require("./types/user_type");
const RestaurantType = require("./types/restaurant_type");
const TacoType = require("./types/taco_type");
const ReviewType = require("./types/review_type");

const AuthService = require("./services/auth");

const Taco = mongoose.model("tacos");
const Restaurant = mongoose.model("restaurants");
const Review = mongoose.model("reviews");

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
        newReview: {
          type: ReviewType, 
          args: {
            body: { type: GraphQLString },
            rating: { type: GraphQLInt },
            restaurantId: { type: GraphQLID }
          },
          resolve(_, { body, rating, restaurantId }) {
            const newReview = new Review({ body, rating, restaurant: restaurantId })
            newReview.save().then((respone) => {
              Review.updateReviewRestaurant(newReview._doc._id, restaurantId)
            })
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
        updateReviewRestaurant: {
          type: ReviewType,
          args: {
            reviewId: { type: GraphQLID },
            restaurantId: { type: GraphQLID }
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
        },
    }
});

module.exports = mutation;