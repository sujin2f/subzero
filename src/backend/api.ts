/**
 * GraphQL endpoint
 */

import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import { hello, items } from 'src/utils/'

const apiRouter = express.Router()
const schema = buildSchema(`
    scalar Date
    type Query {
        hello: Hello
        items: [Item]
    },
    type Hello {
        title: String
    },
    type Item {
        title: String
        expire: Date
    },
`)

apiRouter.use(
    '/',
    graphqlHTTP({
        schema,
        rootValue: {
            hello,
            items,
        },
        graphiql: true,
    }),
)

export { apiRouter }
