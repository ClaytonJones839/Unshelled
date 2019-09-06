const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TacoCheckinSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        // required: true,
        min: 1,
        max: 5,
        // default: 3
    },
    taco: {
        type: Schema.Types.ObjectId,
        ref: "tacos"
    },
    // restaurant: {
    //     type: Schema.Types.ObjectId,
    //     ref: "restaurants"
    // },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

// TacoCheckinSchema.statics.updateTacoRestaurant = (tacoCheckinId, restaurantId) => {
//     const TacoCheckin = mongoose.model("tacoCheckins");
//     const Restaurant = mongoose.model("restaurants");

//     return TacoCheckin.findById(tacoCheckinId).then(tacoCheckin => {
//         if (tacoCheckin.restaurant) {
//             Restaurant.findById(tacoCheckin.restaurant).then(oldRestaurant => {
//                 oldRestaurant.tacos.pull(taco); //???
//                 return oldRestaurant.save();
//             });
//         }
//         return Restaurant.findById(restaurantId).then(newRestaurant => {
//             taco.restaurant = newRestaurant;
//             newRestaurant.tacos.push(taco);

//             return Promise.all([taco.save(), newRestaurant.save()]).then(
//                 ([taco, newRestaurant]) => taco
//             );
//         });
//     });
// };

// TacoCheckinSchema.statics.findRestaurant = function (tacoCheckinId) {
//     return this.findById(tacoCheckinId).populate("restaurant").then(tacoCheckin => tacoCheckin.restaurant)
// }

TacoCheckinSchema.statics.findTaco = function (tacoId) {
    return this.findById(tacoId).populate("taco").then(tacoCheckin => tacoCheckin.taco)
}

// TacoCheckinSchema.statics.findTacoCheckins = function (tacoCheckinId) {
//     return this.findById(tacoCheckinId).populate("tacoCheckin").then(tacoCheckin => tacoCheckin.tacoCheckin)
// }

TacoCheckinSchema.statics.findUser = function (tacoCheckinId) {
    return this.findById(tacoCheckinId).populate("user").then(tacoCheckin => tacoCheckin.user)
}

module.exports = mongoose.model("tacoCheckins", TacoCheckinSchema);