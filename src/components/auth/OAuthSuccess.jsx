
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const user = JSON.parse(decodeURIComponent(params.get('user')));

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }
  }, [navigate, location]);

  return <div>Autenticazione in corso...</div>;
};

export default OAuthSuccess;
