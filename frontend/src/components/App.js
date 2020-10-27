import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { getContent } from '../utils/mestoAuth.js';
import { api } from '../utils/api.js';
import { UserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [onFail, setOnFail] = useState('');

  const history = useHistory();

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res)
            setUserEmail(res.email);
            history.push('/main');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  function handleEditAvatarClick() {
    //открывает попап с аватаром
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    //открывает попап с профилем
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    //открывает попап с добавлением карточки
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardsClick() {
    //открывает попап с подтверждением удаления карточки
    SetIsDeleteCardsPopupOpen(true);
  }

  function handleCardClick(card) {
    //открывает попап с увеличенной фотографией
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  function closeAllPopups() {
    //закрывает все попапы
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    SetIsDeleteCardsPopupOpen(false);
    setIsRegisterPopupOpen(false);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // хуки состояния для открытия//закрытия попапов
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardsPopupOpen, SetIsDeleteCardsPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null); // хук состояния, запоминающий выбранную карточку, на фотографию которой нажали

  const [currentUser, setCurrentUser] = useState({
    // хук, содержащий информцию о пользователе
    name: '',
    about: '',
    avatar: '',
    _id: '',
  });

  React.useEffect(() => { //получение карточек с сервера
    const jwt = localStorage.getItem('jwt');
    api.getInitialCards(jwt) 
      .then(data => { 
        setCards(data); 
      }) 
      .catch(() => { 
        console.error('error'); 
      }) 
  }, [loggedIn])

  const [cards, setCards] = useState([]); // актуальный массив с карточками

  function handleAddPlaceSubmit(values) {
    //добавление новой карточки
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api
      .addCards(values, jwt)
      .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .finally(() => setIsLoading(false))
  }

  function handleCardLike(props) {
    //лайк/дизлайк карточки
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    const isLiked = props.likes.some((i) => i === currentUser._id);
    const cardCallback = (newCard) => {
      const newCards = cards.map((item) => (item._id === props._id ? newCard : item));
      setCards(newCards);
      setIsLoading(false);
    };

    if (!isLiked) {
      api.likeCards(props._id, jwt).then(cardCallback);
    } else {
      api.disLikeCards(props._id, jwt).then(cardCallback);
    }
  }

  const [deleteCard, setDeleteCard] = React.useState({});

  function handleCardDelete(props) {
    // удаление карточки
    handleDeleteCardsClick();
    setDeleteCard(props);
    console.log(deleteCard)
  }

  function deletedCard(deletedCardId) {
    // удаление карточки
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api.deleteCards(deletedCardId, jwt)
      .then(() => {
      const newCards = cards.filter((card) => card._id != deletedCardId);
      setCards(newCards);
      setIsLoading(false);
      closeAllPopups();
    });
  }

  function handleUpdateUser(values) {
    // изменение информции пользователя
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api
      .setUserUnfo(values, jwt)
      .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(values) {
    // изменение аватара
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api
      .changeAvatar(values, jwt)
      .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .finally(() => setIsLoading(false))
  }

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser({
      name: '',
      about: '',
      avatar: '',
      _id: '',
    })
    console.log(currentUser)
  }

  const [isloading, setIsLoading] = React.useState(false);

  return (
    <UserContext.Provider value={currentUser}>
      <div className='body'>
        <div className='page'>
          <Header userEmail={userEmail} onQuit={handleLogout} />
          <Switch>
            <ProtectedRoute
              path='/main'
              loggedIn={loggedIn}
              component={Main}
              loadingIndicator={isloading}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardImageClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Route path='/signup'>
              <Register
                setIsRegisterPopupOpen={setIsRegisterPopupOpen}
                isOpen={isRegisterPopupOpen}
                setOnFail={setOnFail}
              />
            </Route>
            <Route path='/signin'>
              <Login handleLogin={handleLogin} onFail={onFail} setOnFail={setOnFail} />
            </Route>
            <Route>{loggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' />}</Route>
          </Switch>
          <Footer />

          <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            loadingIndicator={isloading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            loadingIndicator={isloading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            loadingIndicator={isloading}
          />
          <ImagePopup
            selectedCard={selectedCard}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            loadingIndicator={isloading}
          />
          <DeletePopup
            isOpen={isDeleteCardsPopupOpen}
            onClose={closeAllPopups}
            card={deleteCard}
            onDeleteCard={deletedCard}
            loadingIndicator={isloading}
          />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
