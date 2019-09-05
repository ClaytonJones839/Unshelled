const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TacoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
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
    price: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "restaurants"
    },
    tacoCheckin: [{
        type: Schema.Types.ObjectId,
        ref: "tacoCheckins"
    }]
});

TacoSchema.statics.updateTacoRestaurant = (tacoId, restaurantId) => {
    const Taco = mongoose.model("tacos");
    const Restaurant = mongoose.model("restaurants");

    return Taco.findById(tacoId).then(taco => {
        if (taco.restaurant) {
            Restaurant.findById(taco.restaurant).then(oldRestaurant => {
                oldRestaurant.tacos.pull(taco);
                return oldRestaurant.save();
            });
        }
        return Restaurant.findById(restaurantId).then(newRestaurant => {
            taco.restaurant = newRestaurant;
            newRestaurant.tacos.push(taco);

            return Promise.all([taco.save(), newRestaurant.save()]).then(
                ([taco, newRestaurant]) => taco
            );
        });
    });
};

TacoSchema.statics.updateTacoCheckin = (tacoId, tacoCheckinId) => {
    const Taco = mongoose.model("tacos");
    const TacoCheckin = mongoose.model("tacoCheckins");

    return Taco.findById(tacoId).then(taco => {

        return TacoCheckin.findById(tacoCheckinId).then(newTacoCheckin => {
            taco.tacoCheckin.push(newTacoCheckin);
            // newRestaurant.tacos.push(taco);

            return Promise.all([taco.save(), newTacoCheckin.save()]).then(
                ([taco, newTacoCheckin]) => taco
            );
        });
    });
};

TacoSchema.statics.findRestaurant = function (tacoId) {
    return this.findById(tacoId).populate("restaurant").then(taco => taco.restaurant)
}

TacoSchema.statics.findTacoCheckins = function (tacoId) {
    return this.findById(tacoId).populate("tacoCheckin").then(taco => taco.tacoCheckin)
}

module.exports = mongoose.model("tacos", TacoSchema);