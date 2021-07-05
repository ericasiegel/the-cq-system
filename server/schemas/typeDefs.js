// import the gql template function
const { gql } = require('apollo-server-express');

// create out typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        thoughts: [Thought]
    }

    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
    }

    type Query {
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }
`;

// export the typeDefs
module.exports = typeDefs;