import React from 'react';
import Error from '../images/Error.svg';
import Success from '../images/Success.svg';

const InfoTooltip = ({ isOpen, onClose }) => {
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container popup__container_type_tooltip'>
        <img
          alt='тут должна быть иконка'
          className='popup__image'
          src={isOpen.data ? Success : Error}
        />
        <h2 className='popup__title popup__title_type_tooltip'>
          {isOpen.data ? 'Вы успешно зарегистрировались!' : isOpen.error}
        </h2>
        <button
          type='button'
          className={`popup__close-icon popup__close-icon_tooltip`}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default InfoTooltip;
