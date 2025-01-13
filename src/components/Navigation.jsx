import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../contexts/UserContext.jsx'

const Navigation = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)

  return (
    <nav className='navbar'>
      <span className='logo'>SJ</span>
      <div className='opciones'>
        <span className='me-3'>
          <Link to='/'>Inicio<i className='fa-solid fa-house ms-2' /></Link>
        </span>
        {user ? (
          <>
            <Link to='/perfil' className='btn m-1 btn-light'>Mi Perfil</Link>
            <button onClick={logout} className='btn btn-danger'>Salir</button>
          </>
        ) : (
          <>
            <Link to='/registrarse' className='btn m-1 register-btn'>Registrarse</Link>
            <Link to='/login' className='btn login-btn'>Iniciar Sesión</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navigation
