import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.jsx';

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return <p>No user data available</p>;
  }

  return (
    <div>
      <h1>Bienvenido {user.email}</h1>
      <p>{user.rol} en {user.lenguage}</p>
    </div>
  );
};

export default Profile;
