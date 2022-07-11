import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import './App.scss';
import Header from './components/Header/Header';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { Auth } from './pages/auth-page/Auth';
import Cart from './pages/cart-page/Cart';
import History from './pages/History/History';
import Home from './pages/main-page/Home';

function App() {
  const { token, login, logout, userId } = useAuth();
  let isAuthenticated = !!token;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('login');
    }
  }, [token, isAuthenticated, navigate]);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}>
      {isAuthenticated && <Header />}

      {/* {!isAuthenticated && navigate('login')} */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
