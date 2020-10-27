const apiRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {validationUser, validationCard} = require('../middlewares/requestValidation');

const { getAllUsers, getUserById, createUser, userAuth, profileEdit, changeAvatar } = require('../controllers/users');
const { getAllCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

apiRouter.get('/users', auth, getAllUsers);
apiRouter.get('/users/:id', auth, getUserById);
apiRouter.post('/signup', validationUser, createUser);
apiRouter.post('/signin', validationUser, userAuth);
apiRouter.get('/users/me', auth, getUserById);
apiRouter.patch('/users/me', auth, profileEdit);
apiRouter.patch('/users/me/avatar', auth, changeAvatar);

apiRouter.get('/cards', auth, getAllCards);
apiRouter.post('/cards', validationCard, auth, createCard);
apiRouter.delete('/cards/:id', auth, deleteCard);
apiRouter.put('/cards/likes/:id', auth, likeCard);
apiRouter.delete('/cards/likes/:id', auth, dislikeCard);

module.exports = {
  apiRouter
}
