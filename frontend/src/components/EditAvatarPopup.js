import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loadingIndicator }) {
  const avatarInputRef = React.useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatarUrl: avatarInputRef.current.value,
    });
    avatarInputRef.current.value = '';
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Изменить аватар'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      loadingIndicator={loadingIndicator}
    >
      <>
        <input
          ref={avatarInputRef}
          type='url'
          name='link'
          id='avatar-input'
          className='popup__form-input single-input'
          required
          autoComplete='off'
          placeholder='Вставьте ссылку'
          minLength={2}
        />
        <span id='avatar-input-error' className='error' />
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
