// import the Mongoose models
const { User, Thought } = require('../models');
// import the authentication error from the Apollo server
const { AuthenticationError } = require('apollo-server-express');
// import the signToken function
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                // `-` use this symbol to omit properties from the query
                // omit the __v property and the user's password
                .select('-__v -password')
                // populate thought lists
                .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne ({ username })
                // omit the __v property and the user's password
                .select('-__v -password')
                // populate thought lists
                .populate('thoughts');
        },
        // parent is passed as a placeholder parameter, this allows us to access the username parameter in the second spot
        // When we query the object:
            // with data- it will find all the thoughts with that username
            // with out data- it will return every thought
        thoughts: async (parent, { username }) => {
            // use a ternary operator to check if username exists in the query
            const params = username ? { username } : {};
            // When we query `thoughts` we will perform a .find() method on the Thought model
            // We will then sort through the data and list it in descending order
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // get thought by ID
        // destructure the _id arguement value and place it into our .findOne() method to look up a single thought by its _id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        }
    },
    Mutation: {
        // a new user is created for whatever is passed in as the args
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            // verify if the username is correct
            if (!user) {
                throw new AuthenticationError('Incorrect Credentials');
            }
            // verify if the password is correct
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;