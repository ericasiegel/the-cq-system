// import the json web token
const jwt = require('jsonwebtoken');

const secret = 'secretcqdesign';

const expiration = '2h';

module.exports = {
    // expects a user object and will ad that user's username, email, _id properties to the token
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
}