import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, loadingIndicator }) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: title,
      link,
    });
    setTitle('');
    setLink('');
  }

  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Создать'}
      onSubmit={handleSubmit}
      loadingIndicator={loadingIndicator}
    >
      <>
        <input
          value={title}
          onChange={handleChangeTitle}
          type='text'
          name='title'
          className='popup__form-input'
          required
          autoComplete='off'
          id='title-input'
          placeholder='Название'
          minLength={1}
          maxLength={30}
        />
        <span id='title-input-error' className='error' />
        <input
          value={link}
          onChange={handleChangeLink}
          type='url'
          name='link'
          className='popup__form-input'
          required
          autoComplete='off'
          id='link-input'
          placeholder='Ссылка на картинку'
        />
        <span id='link-input-error' className='error' />
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
