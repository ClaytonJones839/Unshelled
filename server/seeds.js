const mongoose = require('mongoose');
const Restaurant = mongoose.model('restaurants');
const Taco = mongoose.model('tacos');
const User = mongoose.model("users");


// ------------------ Users -------------------------- /

// const user_photos = [
//     "https://unshelled-dev.s3-us-west-1.amazonaws.com/users/untapped-avatar.jpg",
//     "https://unshelled-dev.s3-us-west-1.amazonaws.com/users/female.png",
//     "https://unshelled-dev.s3-us-west-1.amazonaws.com/users/male.png",
//     "https://unshelled-dev.s3-us-west-1.amazonaws.com/users/santa-hat.jpg"
// ].sort( () => Math.random() - .5)

// const firstNames = ["Kevin", "Leap", "Clay", "Cameron", "Carne"]

// const lastNames = ["Carnitas", "Pollo", "Barbacoa", "Pastor", "Asada" ]

// const usernames = ["CarnitasCrazy", "PeaceAndPollo", "BarbacoaBandit", "PastorParty", "Asaaada"]

// const emails = ["kevin@carnitas.com", "leap@pollo.com", "clay@barbacoa.com", "cameron@pastor.com", "carne@asada.com"];

// let user_objs = firstNames.map((firstname, i) => {
//     return new User({
//         firstName: firstname,
//         lastName: lastNames[i],
//         username: usernames[i],
//         email: emails[i],
//         password: "password123",
//         photo: user_photos[i % user_photos.length]
//     })
// })



// ------------------ Restaurants -------------------------- /

const restaurant_names = [
    "La Victoria Taqueria",
    "Del Taco",
    "Super Taqueria",
    "Tacos Al Pastor",
    "Tacomania",
    "Taqueria Revolucion",
    "Taco Bell",
    "Chipotle",
    "Baja Fresh",
    "Tacos El Gordo"
];

const r_des = {}; // Descriptions
r_des["La Victoria Taqueria"] = "Student-friendly quick fix for Mexican mainstays topped with the trademark \"orange sauce\" condiment.";
r_des["Del Taco"] = "Fast-food chain for Mexican standards like tacos, burritos & quesadillas plus breakfast.";
r_des["Super Taqueria"] = "Trendy taqueria offers classic Mexican fare at the counter, plus a salsa bar in a no-nonsense venue.";
r_des["Tacos Al Pastor"] = "Filling burritos, enchiladas & other Mexican favorites round out the menu at this festive standby.";
r_des["Tacomania"] = "Bare-bones food truck turning out tacos & casual Latin American favorites on paper plates.";
r_des["Taqueria Revolucion"] = "Popular taqueria offering familiar Mexican eats in an easygoing space with counter service.";
r_des["Taco Bell"] = "Fast-food chain serving Mexican-inspired fare such as tacos, quesadillas & nachos.";
r_des["Chipotle"] = "Fast-food chain offering Mexican fare, including design-your-own burritos, tacos & bowls.";
r_des["Baja Fresh"] = "Mexican fast-food chain featuring fish tacos, burritos, quesadillas & other Baja-inspired entrees.";
r_des["Tacos El Gordo"] = "No-frills Mexican counter-serve joint featuring Tijuana tacos, mulas, loaded fries & more.";

const r_loc = {}; // Locations (City, State)
r_loc["La Victoria Taqueria"] = "San Jose, California";
r_loc["Del Taco"] = "Modesto, California";
r_loc["Super Taqueria"] = "San Jose, California";
r_loc["Tacos Al Pastor"] = "San Jose, California";
r_loc["Tacomania"] = "San Jose, California";
r_loc["Taqueria Revolucion"] = "San Diego, California";
r_loc["Taco Bell"] = "Pleasanton, California";
r_loc["Chipotle"] = "Tampa Bay, Florida";
r_loc["Baja Fresh"] = "Sacramento, California";
r_loc["Tacos El Gordo"] = "Las Vegas, Nevada";

const r_pho = {} // Photos
r_pho["La Victoria Taqueria"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/la-victoria-taqueria.jpg";
r_pho["Del Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/del-taco.jpg";
r_pho["Super Taqueria"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/super-taqueria.jpg";
r_pho["Tacos Al Pastor"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos-al-pastor.jpg";
r_pho["Tacomania"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacomania.jpg";
r_pho["Taqueria Revolucion"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/taqueria-revolucion.jpg";
r_pho["Taco Bell"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/taco-bell.jpeg";
r_pho["Chipotle"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/chipotle.jpg";
r_pho["Baja Fresh"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/baja-fresh.jpg";
r_pho["Tacos El Gordo"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos-el-gordo.jpg";


// ----------------------- TACOS --------------------------------- //
const taco_names = [
    "Super Taco",
    "Del Taco",
    "Soft Taco",
    "Taco Chico",
    "Taco Regio",
    "Quesa Taco",
    "Nacho Cheese Doritos Locos Taco",
    "Crispy Corn Taco",
    "Crispy Wahoo Taco",
    "Adobada Taco",
    "Cheesy Gordita Crunch",
    "Double Decker Taco Supreme",
    "Taco Veggie",
    "Baja Taco",
    "Cabeza Taco"
];

const t_des = {}
t_des["Super Taco"] = "Beans, fresh salsa, cheese, sour cream, guac, and choice of meat";
t_des["Del Taco"] = "The Del Taco is inspired by the original and loaded with more of everything you love, like more seasoned beef and more hand-grated cheddar cheese, plus crisp lettuce and chopped fresh tomatoes in a bigger, crunchier shell.";
t_des["Soft Taco"] = "Meat, sour cream, cilantro, onions, cheese, & guacamole";
t_des["Taco Chico"] = "Served on small corn tortilla. Comes with meat, onions, and cilantro.";
t_des["Taco Regio"] = "Regular flour tortilla, onions, cilantro, avocade, whole beans and carne asada.";
t_des["Quesa Taco"] = "Handmade tortilla with cheese & choice of meat.";
t_des["Nacho Cheese Doritos Locos Taco"] = "Crunchy taco with the shell made of Doritos tortilla chips.";
t_des["Crispy Corn Taco"] = "This taco includes iron-rich steak, belly-slimming pintos, fiber-dense brown rice and fiery, metabolism-boosting salsa.";
t_des["Crispy Wahoo Taco"] = "Wild Caught Wahoo (Ono) hand battered fried crispy topped with cabbage, pico de gallo and tangy salsa. Wrapped in corn tortillas.";
t_des["Adobada Taco"] = "Spiced pork on a corn tortilla with your choice of fresh toppings.";
t_des["Cheesy Gordita Crunch"] = "Cheesy Gordita Crunch is made with a hard taco shell filled with seasoned beef, lettuce, real cheddar cheese and spicy ranch sauce all tucked nicely in a piece of flatbread with melted three cheese blend.";
t_des["Double Decker Taco Supreme"] = "Double-Decker Taco Supreme is a Crunchy Taco Supreme that sits on a bed of warm refried beans, while the Flour Tortilla sits underneath.";
t_des["Taco Veggie"] = "Regular tortilla, onions, cilantro, cheese, avocado, tomato, whole beans, and bell peppers.";
t_des["Baja Taco"] = "Warm soft grilled corn tortillas filled with your favorite protein and topped with freshly made salsa, fresh onions, and cilantro.";
t_des["Cabeza Taco"] = "Beef head on a corn tortilla with your choice of fresh toppings.";

const pork_style = ["Adobada Taco", "Super Taco"];
const beef_style = ["Cabeza Taco", "Crispy Corn Taco", "Taco Regio", "Del Taco", "Soft Taco", "Nacho Cheese Doritos Locos Tacos", "Cheesy Gordita Crunch", "Double Decker Taco Supreme"];
const chicken_style = ["Quesa Taco", "Taco Chico"];
const veg_style = ["Taco Veggie"];
const fish_style = ["Crispy Wahoo Taco", "Baja Taco"];

const t_pho = {};
t_pho["Super Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/super-tacos.jpg";
t_pho["Del Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/del-taco.jpg";
t_pho["Soft Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/soft-taco.jpg";
t_pho["Taco Chico"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/taco-chico.jpg";
t_pho["Taco Regio"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/taco-regio.jpeg";
t_pho["Quesa Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/cheese-taco.jpeg";
t_pho["Nacho Cheese Doritos Locos Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/doritos-locos-tacos.png";
t_pho["Crispy Corn Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/crispy-corn-taco.png";
t_pho["Crispy Wahoo Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/crispy-wahoo-taco.png";
t_pho["Adobada Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/adobada-taco.jpg";
t_pho["Cheesy Gordita Crunch"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/gordita-crunch.jpg";
t_pho["Double Decker Taco Supreme"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/double-decker.png";
t_pho["Taco Veggie"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/taco-veggie.webp";
t_pho["Baja Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/baja-taco.jpg";
t_pho["Cabeza Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos/cabeza-taco.jpeg";


const min_price = 1;
const max_price = 5;



let taco_objs = taco_names.map((name, idx) => (
    new Taco({
        name: name,
        description: t_des[name],
        photo: t_pho[name],
        style: beef_style.includes(name) ? "Beef" :
                pork_style.includes(name) ? "Pork" :
                    chicken_style.includes(name) ? "Chicken" :
                        fish_style.includes(name) ? "Fish" :
                        "Veggie",
        price: Math.floor(Math.random() * (max_price - min_price + 1)) + min_price,
        restaurant: {}
    })
))


var restaurant_objs = restaurant_names.map((name, idx) => (
    new Restaurant({
        name: name,
        description: r_des[name],
        location: r_loc[name],
        photo: r_pho[name],
        tacos: []
    })
))

taco_objs.forEach((taco, i) => {
    const index = i % restaurant_objs.length;
    let restObj = restaurant_objs[index]
    taco.restaurant = restObj;
    restObj.tacos.push(taco._id)
})



// module.exports.users = user_objs;
module.exports.tacos = taco_objs;
module.exports.restaurants = restaurant_objs;