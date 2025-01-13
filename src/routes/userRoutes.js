const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getUsuariosController, getUsuarioController, registrarUsuarioController, deleteUserController, loginUsuarioController } = require("../controllers/userControllers");

// Define the routes
router.get("/", (req, res) => {
  res.send("Welcome to SoftJobs API");
});
router.get("/usuarios", auth, getUsuariosController); // Ensure the auth middleware is used
router.get("/usuarios/:id", auth, getUsuarioController);
router.post("/usuarios", registrarUsuarioController); // Remove auth middleware
router.delete("/usuarios/:id", auth, deleteUserController); // Use the auth middleware
router.post("/login", loginUsuarioController); // Ensure the login route is defined

module.exports = router;


