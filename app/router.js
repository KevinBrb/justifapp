const { Router } = require('express');
const userController = require('./controllers/userController');
const textController = require('./controllers/textController');
const verify = require('./middlewares/verify');

const router = Router();

/**
 * Token creation
 * @route POST /api/token
 * @group token - token creation routes
 * @param {string} email.body.required - Email of registered user
 * @returns {JSON} 200 - Success message and token in headers
 */
router.post('/token', userController.createToken);

/**
 * Text justification
 * @route POST /api/justify
 * @group justify - text justification
 * @param {string} text.body.required - Text to justify
 * @returns {string} 200 - Justified text
 * @headers {string} token.authorization - Header authorization with token in value
 */
router.post('/justify', verify, textController.justify);

module.exports = router;