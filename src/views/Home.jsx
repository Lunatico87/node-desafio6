import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { useContext, useEffect } from 'react'
import { ENDPOINT } from '../config/constans'

const Home = () => {
  const { setUser } = useContext(UserContext)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: user }) => setUser(user))
        .catch(() => {
          window.sessionStorage.removeItem('token')
          setUser(null)
        })
    }
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido a <span className='fw-bold'>Soft Jobs</span>
      </h1>
      <h4>
        El lugar donde todos los Juniors Developer <br /> podrán obtener
        experiencia
      </h4>
    </div>
  )
}

export default Home
