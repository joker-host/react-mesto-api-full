import React from 'react';
import PopupWithForm from './PopupWithForm';
import { UserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loadingIndicator }) {
  const userInfo = React.useContext(UserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(userInfo.name);
    setDescription(userInfo.about);
  }, [userInfo]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      loadingIndicator={loadingIndicator}
    >
      <>
        <input
          value={name || ''}
          onChange={handleChangeName}
          type='text'
          name='name'
          className='popup__form-input'
          defaultValue='Жак-Ив Кусто'
          required
          autoComplete='off'
          id='name-input'
          placeholder='Имя'
          minLength={2}
          maxLength={40}
          pattern='[А-ЯЁа-яёA-Za-z-–—\s]*'
        />
        <span id='name-input-error' className='error' />
        <input
          value={description || ''}
          onChange={handleChangeDescription}
          type='text'
          name='about'
          className='popup__form-input'
          defaultValue='Исследователь океана'
          required
          autoComplete='off'
          id='job-input'
          placeholder='Род деятельности'
          minLength={2}
          maxLength={200}
        />
        <span id='job-input-error' className='error' />
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
