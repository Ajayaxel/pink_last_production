// src/pages/GoogleCallback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // ✅ Store the JWT
      navigate('/dashboard'); // ✅ Redirect after login
    } else {
      navigate('/login'); // fallback if no token
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default GoogleCallback;
