const db = require('../database');

const collection = db.then(db => db.collection('user'));

class User {
    constructor (data) {
        for(const prop in data) {
            this[prop] = data[prop];
        }
    }

    /**
     * @param {string} email - Email field of the form
     * @returns {object} Instanciated User class
     * @example
     *      User.findByEmail(email)
     */
    static async findByEmail(email) {
        const user = await (await collection).findOne({ "email": email });
        return new User(user);
    }

    /**
     * @param {string} tokenValue - The token that we create with the '/token' endpoint
     * @returns {object} Instanciated User class
     * @example
     *      User.findByToken(tokenValue)
     */
    static async findByToken(tokenValue) {
        const user = await (await collection).findOne({ "token.value": tokenValue });
        return new User(user);
    }

    /**
     * @param {string} email - The email of the user to update
     * @param {object} data - The datas that have to be updated
     * @returns {number} 1 if success
     * @example
     *      User.findByEmailAndUpdate(email, data)
     */
    static async findByEmailAndUpdate(email, data) {
        const userUpdateResult = await (await collection).updateOne(
            { "email": email },
            { $set: data }
        );

        return userUpdateResult.modifiedCount;
    }
}

module.exports = User;