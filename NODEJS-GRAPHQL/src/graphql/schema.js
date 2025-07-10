// defines the structure of the data

const { gql } = require('graphql-tag');


// Query types for fetching all data items or single data items
// Mutation types for modifying/deleting or creating new data items 

const typeDefs = gql`
    type Product {
        id: ID!
        title: String!
        category: String!
        price: Float!
        inStock: Boolean!
    }

    type Query {
    products: [Product!]!
    product(id: ID!): Product
    }

    type Mutation{

    createProduct(
    title: String!
    category: String!
    price: Float!
    inStock: Boolean!
    ) : Product

    deleteProduct(id: ID!): Boolean

    updateProduct(
    id: ID!
        title: String
        category: String
        price: Float
        inStock: Boolean
    ): Product
    }
`;

module.exports = typeDefs;