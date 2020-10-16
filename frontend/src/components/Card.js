import React from 'react';
import deleteButton from '../images/delete.svg';
import { UserContext } from '../contexts/CurrentUserContext.js';

function Card({
  name,
  link,
  likes,
  owner,
  _id,
  onCardClick,
  onCardLike,
  onCardDelete,
  loadingIndicator,
}) {
  const userInfo = React.useContext(UserContext);

  const isOwn = owner._id === userInfo._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? 'element__delete_visible' : 'element__delete_hidden'
  }`;

  const isLiked = likes.some((i) => i._id === userInfo._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? `element__like_active` : ''}`;

  function handleClick() {
    onCardClick({ name, link });
  }

  function handleLikeClick() {
    onCardLike({ name, link, likes, owner, _id });
  }

  function handleDeleteClick() {
    onCardDelete({ name, link, likes, owner, _id });
  }

  return (
    <div className='element'>
      <img
        src={deleteButton}
        alt='кнопка delete :)'
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        alt='Упс, кажется вы вставили не рабочую ссылку'
        className='element__photo'
        src={link}
        onClick={handleClick}
      />
      <div className='element__capture-container'>
        <p className='element__capture'>{name}</p>
        <div className='element__like-container'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            disabled={loadingIndicator}
          />
          <p className='element__like-counter'>{likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
