import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';
import './Header.scss';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const auth = useContext(AuthContext);
  const logoutHandler = () => {
    auth.logout()
    logout(); 
    localStorage.removeItem('userData')
    localStorage.removeItem('token')

    navigate('login');
  };

  return (
    <div className="header">
      <Link style={{ textDecoration: 'none' }} to="/">
        <div className="header_logo">
          <h3>VLAD DELIVERY</h3>
        </div>
      </Link>

      <Link style={{ textDecoration: 'none' }} to="/">
        <div className="header_menu">Shop</div>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/cart">
        <div className="header_menu">Cart</div>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/history">
        <div className="header_menu">History</div>
      </Link>
      <div>
        <div onClick={logoutHandler} className="logout">
          Logout
        </div>
      </div>
    </div>
  );
}
