require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userController = {
    /**
     * @param {object} req.body - Form body
     * @param {object} res - The response
     * @returns {object} res - response with status, headers & success/fail message
     * @example
     *      userController.createToken()
     */
    createToken: async (req, res) => {
        // Check if user exists
        const user = await User.findByEmail(req.body.email);

        if(!user.email){
            const newUser = new User(req.body);

            console.log(newUser);
            // Token creation
            const token = jwt.sign({
                email: newUser.email
            }, process.env.SECRET, {
                expiresIn: '24h'
            });

            // Datas to add in database with token and rateLimit            
            newUser.token = {
                value: token,
                rateLimit: 80000
            }

            try {
                // Create user
                await newUser.create();

                res.status(200).header('authorization', token).json(newUser);
            } catch (err) {
                res.status(400).json({ error: err});
            }
        } else {
            // Token creation
            const token = jwt.sign({
                email: user.email
            }, process.env.SECRET, {
                expiresIn: '24h'
            });

            // Add data in database with token and rateLimit
            const dataForUpdate = {
                token: {
                    value: token,
                    rateLimit: 80000
                }
            };

            try {
                // Update user
                await User.findByEmailAndUpdate(req.body.email, dataForUpdate);

                res.status(200).header('authorization', token).json({ message: 'Token creation success'});
            } catch (err) {
                res.status(400).json({ error: err});
            }
        }            
    }
}

module.exports = userController;