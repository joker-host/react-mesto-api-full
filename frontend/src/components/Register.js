import React from 'react';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { api } from '../utils/api.js';
// import { register } from '../utils/mestoAuth.js';

const Register = ({ setIsRegisterPopupOpen, setOnFail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    api
      .register(email, password)
      .then((res) => {
        if (res.success) {
          setIsRegisterPopupOpen(res);
          setOnFail('');
          history.push('/signin');
        } else {
          setIsRegisterPopupOpen(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          className='auth__input'
          type='email'
          placeholder='Email'
          required={true}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Пароль'
          required={true}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type='submit' className='auth__submit-button'>
          Зарегистрироваться
        </button>
        <Link className='auth__link-to-sign-in' to='/signin'>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Register;
