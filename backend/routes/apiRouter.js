const apiRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {validationUser} = require('../middlewares/requestValidation');

const { createUser, userAuth } = require('../controllers/users');
const { createCard } = require('../controllers/cards');
const { getSecret } = require('../controllers/secret');

apiRouter.post('/signup', validationUser, createUser);
apiRouter.post('/signin', validationUser, userAuth);
apiRouter.post('/secret', auth, getSecret);
apiRouter.post('/cards', auth, createCard);

module.exports = {
    apiRouter
}
