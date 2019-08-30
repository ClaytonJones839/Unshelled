const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const models = require('./models/index');
const schema = require('./schema/schema');
const cors = require("cors");

const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}
const expressGraphQL = require("express-graphql");

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));



app.use(bodyParser.json());

module.exports = app;