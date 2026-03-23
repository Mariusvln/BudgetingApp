import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout(); // Iškviečia tavo AuthContext funkciją
      } finally {
        navigate('/login'); // Visada nukreipia į login, net jei kilo klaida
      }
    };

    performLogout();
  }, [logout, navigate]);

  return null; // Nieko nerodome ekrane
};

export default Logout;
