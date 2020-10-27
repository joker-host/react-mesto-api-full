import React from 'react';
import Card from './Card';
import { UserContext } from '../contexts/CurrentUserContext.js';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardImageClick,
  onCardDelete,
  onCardLike,
  cards,
  loadingIndicator,
}) {
  const userInfo = React.useContext(UserContext);
  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-wrapper' onClick={onEditAvatar}>
          <div className='profile__avatar-overlay'></div>
          <img
            alt='здесь должна быть аватарка :)'
            className='profile__avatar'
            src={userInfo.avatar}
          />
        </div>
        <div className='profile__info'>
          <h2 className='profile__author'>{userInfo.name}</h2>
          <button type='button' className='profile__edit-button' onClick={onEditProfile} />
          <p className='profile__description'>{userInfo.about}</p>
        </div>
        <button type='button' className='profile__add-button' onClick={onAddPlace} />
      </section>
      <section className='elements'>
        {cards.map(({ _id, ...props }) => (
          <Card
            key={_id}
            _id={_id}
            onCardClick={onCardImageClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            loadingIndicator={loadingIndicator}
            {...props}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
