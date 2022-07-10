import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { loginRequest } from '../../http/shopsAPI';
import './Auth.scss';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Cant be empty');
  const [passwordError, setPasswordError] = useState('Cant be empty');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [formValid, setFormValid] = useState(false);
  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);
  const emailHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setEmail(e.target.value);
    const validators =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!validators.test(String(e.target.value).toLowerCase())) {
      setEmailError('uncorrect email');
    } else {
      setEmailError('');
    }
  };
  const passwordHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setPassword(e.target.value);
    if (e.target.value.length < 3) {
      setPasswordError('min length 3 simbol');
    } else {
      setPasswordError('');
    }
  };

  const loginHandler = async () => {
    try {
      const data = await loginRequest(form.email, form.password);
      auth.login(data.token, data.userId);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <div className="login_container">
      <div className="login_form">
        <div>email: admin@gmail.com</div>

        <div>password: admin</div>
        <div className="form_container">
          <div className="form_name">Login</div>
          <div className="form_input">
            <input
              onBlur={(e) => blurHandler(e)}
              id="email"
              name="email"
              placeholder="Email"
              className="input input_email"
              onChange={emailHandler}
              value={email}
            />
            {emailDirty && emailError && (
              <div className="error">{emailError}</div>
            )}
            <input
              onBlur={(e) => blurHandler(e)}
              id="password"
              name="password"
              placeholder="Password"
              className=" input input_password"
              value={password}
              onChange={passwordHandler}
            />
            {passwordDirty && passwordError && (
              <div className="error">{passwordError}</div>
            )}
          </div>

          <button
            disabled={!formValid}
            onClick={loginHandler}
            className="form_button">
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};
