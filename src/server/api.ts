/**
 * GraphQL endpoint
 */

import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import { getItems, createItem, removeItem } from 'src/utils'

const apiRouter = express.Router()
const schema = buildSchema(`
    type Query {
        getItems: [Item]
    },
    type Mutation {
        createItem(title: String!, expiration: String!): Item
        removeItem(_id: String!): Boolean
    }
    type Item {
        _id: String
        title: String
        expiration: String
    },
`)

apiRouter.use(
    '/',
    graphqlHTTP({
        schema,
        rootValue: {
            getItems,
            createItem,
            removeItem,
        },
        graphiql: true,
    }),
)

export { apiRouter }
