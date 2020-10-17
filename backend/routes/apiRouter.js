const apiRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {validationUser} = require('../middlewares/requestValidation');

const { createUser, userAuth } = require('../controllers/users');
const { getSecret } = require('../controllers/secret');

apiRouter.post('/signup', validationUser, createUser);
apiRouter.post('/signin', validationUser, userAuth);
apiRouter.post('/secret', auth, getSecret);

module.exports = {
    apiRouter
}
