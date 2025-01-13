const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsuarios = async () => {
  try {
    const { rows: usuarios } = await pool.query("SELECT * FROM usuarios");
    return usuarios;
  } catch (error) {
    throw { code: 500, message: "Error al obtener los usuarios" };
  }
};

const getUsuario = async (id) => {
  const values = [id];
  const consulta = "SELECT * FROM usuarios WHERE id = $1";
  const { rows: [usuario], rowCount } = await pool.query(consulta, values);
  if (!rowCount) {
    throw { code: 404, message: "Usuario no encontrado" };
  }
  return usuario;
};

const getUsuarioByEmail = async (email) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const { rows: [usuario], rowCount } = await pool.query(consulta, values);
  if (!rowCount) {
    throw { code: 404, message: "Usuario no encontrado" };
  }
  return usuario;
};

const registrarUsuario = async (usuario) => {
  const { email, password, rol, lenguage } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password, 10);
  const consulta = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [email, passwordEncriptada, rol, lenguage];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

const verificarCredenciales = async (email, password) => {
  try {
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const { rows: [usuario], rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
      console.error("Usuario no encontrado con el email:", email);
      throw { code: 401, message: "Email o contraseña incorrecta" };
    }
    const { password: passwordEncriptada } = usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
    if (!passwordEsCorrecta) {
      console.error("Contraseña incorrecta para el email:", email);
      throw { code: 401, message: "Email o contraseña incorrecta" };
    }
    return usuario;
  } catch (error) {
    console.error("Error en verificarCredenciales:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  const consulta = "DELETE FROM usuarios WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount) {
    throw { code: 404, message: "No se encontró ningún usuario con este ID" };
  }
};

module.exports = {
  getUsuarios,
  getUsuario,
  registrarUsuario,
  verificarCredenciales,
  deleteUser,
  getUsuarioByEmail
};
