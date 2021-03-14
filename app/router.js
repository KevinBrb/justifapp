const { Router } = require('express');
const userController = require('./controllers/userController');
const textController = require('./controllers/textController');
const verify = require('./middlewares/verify');

const router = Router();

router.post('/token', userController.createToken);
router.post('/justify', verify, textController.justify);

module.exports = router;