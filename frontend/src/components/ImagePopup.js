import React from 'react';

function ImagePopup({ selectedCard, onClose }) {
  let name = '';
  let link = '';
  if (selectedCard) {
    name = selectedCard.name;
    link = selectedCard.link;
  }

  return (
    <div className={`popup popup_type_image ${selectedCard ? 'popup_opened' : ''}`}>
      <figure className='popup__container-image'>
        <img alt='здесь должна быть увеличенная картинка' className='popup__image' src={link} />
        <figcaption className='popup__capture'>{name}</figcaption>
        <button
          type='button'
          className='popup__close-icon popup__close-icon_image'
          onClick={onClose}
        />
      </figure>
    </div>
  );
}

export default ImagePopup;
