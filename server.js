require('dotenv').config(); // Add this line at the top
const express = require("express");
const app = express();
const routes = require("./src/routes/userRoutes"); // Import the routes
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", routes); // Use the routes

app.listen(3000, () => console.log("SERVER ON"));