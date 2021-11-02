/**
 * GraphQL endpoint
 */

import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import { hello } from 'src/utils/'

const apiRouter = express.Router()
const schema = buildSchema(`
    type Query {
        hello: Hello
    },
    type Hello {
        title: String
    },
`)

apiRouter.use(
    '/',
    graphqlHTTP({
        schema,
        rootValue: {
            hello,
        },
        graphiql: true,
    }),
)

export { apiRouter }
