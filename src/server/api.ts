/**
 * GraphQL endpoint
 */

import express, { Request, Response, NextFunction } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { ErrorMessages } from 'src/constants'

import { getItems, createItem, removeItem } from 'src/utils'
import { getUserById, setDarkMode } from 'src/utils/mongo/users'

declare module 'express-session' {
    interface Session {
        user?: string
    }
}

const apiRouter = express.Router()
const schema = buildSchema(`
    type Query {
        getItems: [Item]
        getUser: User
    },
    type Mutation {
        createItem(title: String!, expiration: String!): Item
        removeItem(_id: String!): Boolean
        setDarkMode(darkMode: Boolean!): Boolean
    }
    type Item {
        _id: String
        title: String
        expiration: String
    },
    type User {
        name: String,
        email: String,
        photo: String,
        darkMode: Boolean
    }
`)

const loggingMiddleware = (req: Request, _: Response, next: NextFunction) => {
    next()
}
apiRouter.use(loggingMiddleware)

apiRouter.use(
    '/',
    graphqlHTTP({
        schema,
        rootValue: {
            getItems: (_: void, req: Request) => {
                return getItems(req.session.user)
            },
            createItem: (
                args: { title: string; expiration: string },
                req: Request,
            ) => {
                return createItem(args.title, args.expiration, req.session.user)
            },
            removeItem: (args: { _id: string }, req: Request) => {
                return removeItem(args._id, req.session.user)
            },
            getUser: (_: void, req: Request) => {
                return req.session.user && getUserById(req.session.user)
            },
            setDarkMode: (args: { darkMode: boolean }, req: Request) => {
                if (!req.session.user) {
                    throw new Error(ErrorMessages.AUTHENTICATION_FAILED)
                }
                return setDarkMode(req.session.user, args.darkMode)
            },
        },
        graphiql: true,
    }),
)

export { apiRouter }
