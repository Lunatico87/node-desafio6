import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';
import UserContext from '../contexts/UserContext.jsx';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = { email: 'docente@desafiolatam.com', password: '123456' };

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const { login } = useContext(UserContext);

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = async (e) => {
    e.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email y password obligatorias.');
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!');
    }

    try {
      await login(user.email, user.password);
      window.alert('Usuario identificado con éxito 😀.');
      navigate('/perfil');
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
      const errorMessage = error.response?.data?.message || "Error desconocido";
      window.alert(`${errorMessage} 🙁.`);
    }
  };

  return (
    <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className='form-group mt-1 '>
        <label>Email address</label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Enter email'
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Password</label>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
        />
      </div>
      <button type='submit' className='btn btn-light mt-3'>Iniciar Sesión</button>
    </form>
  );
};

export default Login;
