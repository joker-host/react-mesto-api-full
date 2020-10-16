import React from 'react';
import logo from '../images/logo.svg';
import { Route, Link, useHistory } from 'react-router-dom';

function Header({ userEmail, onQuit }) {
  const history = useHistory();

  const quit = () => {
    onQuit();
    localStorage.removeItem('jwt');
    history.push('/login');
  };

  return (
    <header className='header'>
      <Route path='/signup'>
        <img src={logo} alt='здесь должен быть логотип :)' className='header__logo' />
        <Link className='header__caption' to='/signin'>
          Войти
        </Link>
      </Route>
      <Route path='/signin'>
        <img src={logo} alt='здесь должен быть логотип :)' className='header__logo' />
        <Link className='header__caption' to='/signup'>
          Регистрация
        </Link>
      </Route>
      <Route path='/main'>
        <img src={logo} alt='здесь должен быть логотип :)' className='header__logo' />
        <p className='header__user-email'>{userEmail}</p>
        <Link className='header__caption' to='/signin' onClick={quit}>
          Выйти
        </Link>
      </Route>
    </header>
  );
}

export default Header;
