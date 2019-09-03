const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const models = require('./models/index');
const schema = require('./schema/schema');
const cors = require("cors");
const restaurantSeeds = require("./restaurant_seeds");
const User = require('./models/User');
const Taco = require('./models/Taco');
const Restaurant = require('./models/Restaurant');

const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}
const expressGraphQL = require("express-graphql");

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    }
  })
);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err))
  // .then(Restaurant.collection.insert(restaurantSeeds))
  // .then(console.log("Successfully seeded MongoDB with Restaurants"))


app.use(bodyParser.json());

module.exports = app;