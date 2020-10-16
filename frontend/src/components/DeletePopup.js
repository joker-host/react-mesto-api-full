import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup({ isOpen, onClose, card, onDeleteCard, loadingIndicator }) {
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name='delete-cards'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Да'}
      onSubmit={handleSubmit}
      loadingIndicator={loadingIndicator}
    ></PopupWithForm>
  );
}

export default DeletePopup;
