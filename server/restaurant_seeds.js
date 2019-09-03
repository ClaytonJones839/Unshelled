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
]

const r_des = {} // Descriptions
r_des["La Victoria Taqueria"] = "Student-friendly quick fix for Mexican mainstays topped with the trademark \"orange sauce\" condiment."
r_des["Del Taco"] = "Fast-food chain for Mexican standards like tacos, burritos & quesadillas plus breakfast."
r_des["Super Taqueria"] = "Trendy taqueria offers classic Mexican fare at the counter, plus a salsa bar in a no-nonsense venue."
r_des["Tacos Al Pastor"] = "Filling burritos, enchiladas & other Mexican favorites round out the menu at this festive standby."
r_des["Tacomania"] = "Bare-bones food truck turning out tacos & casual Latin American favorites on paper plates."
r_des["Taqueria Revolucion"] = "Popular taqueria offering familiar Mexican eats in an easygoing space with counter service."
r_des["Taco Bell"] = "Fast-food chain serving Mexican-inspired fare such as tacos, quesadillas & nachos."
r_des["Chipotle"] = "Fast-food chain offering Mexican fare, including design-your-own burritos, tacos & bowls."
r_des["Baja Fresh"] = "Mexican fast-food chain featuring fish tacos, burritos, quesadillas & other Baja-inspired entrees."
r_des["Tacos El Gordo"] = "No-frills Mexican counter-serve joint featuring Tijuana tacos, mulas, loaded fries & more."

const r_loc = {} // Locations (City, State)
r_loc["La Victoria Taqueria"] = "San Jose, California"
r_loc["Del Taco"] = "Modesto, California"
r_loc["Super Taqueria"] = "San Jose, California"
r_loc["Tacos Al Pastor"] = "San Jose, California"
r_loc["Tacomania"] = "San Jose, California"
r_loc["Taqueria Revolucion"] = "San Diego, California"
r_loc["Taco Bell"] = "Pleasanton, California"
r_loc["Chipotle"] = "Tampa Bay, Florida"
r_loc["Baja Fresh"] = "Sacramento, California"
r_loc["Tacos El Gordo"] = "Las Vegas, Nevada"

const r_pho = {} // Photos
r_pho["La Victoria Taqueria"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/la-victoria-taqueria.jpg"
r_pho["Del Taco"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/del-taco.jpg"
r_pho["Super Taqueria"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/super-taqueria.jpg"
r_pho["Tacos Al Pastor"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos-al-pastor.jpg"
r_pho["Tacomania"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacomania.jpg"
r_pho["Taqueria Revolucion"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/taqueria-revolucion.jpg"
r_pho["Taco Bell"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/taco-bell.jpeg"
r_pho["Chipotle"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/chipotle.jpg"
r_pho["Baja Fresh"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/baja-fresh.jpg"
r_pho["Tacos El Gordo"] = "https://unshelled-dev.s3-us-west-1.amazonaws.com/tacos-el-gordo.jpg"


// ----------------------- TACOS --------------------------------- //
// const tacos []



module.exports = restaurant_names.map((name, idx) => ({
    name: name,
    description: r_des[name],
    location: r_loc[name],
    photo: r_pho[name]
    // tacos: []
}))