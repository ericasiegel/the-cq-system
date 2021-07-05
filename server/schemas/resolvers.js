// import the Mongoose models
const { User, Thought } = require('../models');


const resolvers = {
    Query: {
        // parent is passed as a placeholder parameter, this allows us to access the username parameter in the second spot
        // When we query the object:
            // with data- it will find all the thoughts with that username
            // wit out data- it will return every thought
        thoughts: async (parent, { username }) => {
            // use a ternary operator to check if username exists in the query
            const params = username ? { username } : {};
            // When we query `thoughts` we will perform a .find() method on the Thought model
            // We will then sort through the data and list it in descending order
            return Thought.find(params).sort({ createdAt: -1 });
        }
    }
};

module.exports = resolvers;