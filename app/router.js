const { Router } = require('express');
const userController = require('./controllers/userController');
const textController = require('./controllers/textController');
const verify = require('./middlewares/verify');

const router = Router();
/**
* @typedef email  
* @property {string} email.required  - Email
*/

/**
* @typedef text  
* @property {string} text.required  - Text to justify
*/

/**
* Token creation
* @route POST /token
* @group token - token creation routes
* @param {email.model} email.body.required - Email of registered user
* @returns {JSON} 200 - Success message and token in headers
*/
router.post('/token', userController.createToken);

/**
 * Text justification
 * @route POST /justify
 * @group justify - text justification
 * @param {text.model} text.body.required - Text to justify
 * @consumes text/plain
 * @produces text/plain
 * @returns {string} 200 - Justified text
 * @headers {string} token.authorization - Header authorization with token in value
 * @security JWT
 */
router.post('/justify', verify, textController.justify);

module.exports = router;