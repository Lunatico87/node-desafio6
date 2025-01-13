require('dotenv').config(); 
const { getUsuarios, getUsuario, registrarUsuario, verificarCredenciales, deleteUser, getUsuarioByEmail } = require("../modules/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY); // Debug line to check the key

const getUsuariosController = async (req, res) => {
  try {
    const email = req.user.email; // Use decoded token from middleware
    const usuario = await getUsuarioByEmail(email); // Assuming you have a function to get user by email
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

const getUsuarioController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id } = req.params;
    const usuario = await getUsuario(id);
    if (usuario.email !== decoded.email) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

const registrarUsuarioController = async (req, res) => {
  try {
    const usuario = await registrarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { email } = jwt.decode(token);
    await deleteUser(id);
    res.send(`El usuario ${email} ha eliminado el evento de id ${id}`);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const loginUsuarioController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email); // Log email
    const user = await verificarCredenciales(email, password);
    console.log("User authenticated successfully:", user); // Log user details

    // Generate JWT token
    console.log("Generating token with secret key:", process.env.JWT_SECRET_KEY); // Debug line
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ user, token });
  } catch (error) {
    console.error("Error during authentication:", error); // Log the error for debugging
    if (error.code) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Fallo la autentication" });
    }
  }
};

module.exports = {
  getUsuariosController,
  getUsuarioController,
  registrarUsuarioController,
  deleteUserController,
  loginUsuarioController,
};