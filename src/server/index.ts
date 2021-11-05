/* eslint-disable no-console */
import ejs from 'ejs'
import moduleAlias from 'module-alias'
import express, { Application, Response } from 'express'
import path from 'path'
import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'
import { config as detEnvConfig } from 'dotenv'

import { baseDir } from '../utils/environment'
// Alias
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'stage') {
    moduleAlias.addAlias('src', baseDir)
    moduleAlias()
}

/* eslint-disable import/first */
import { bundles, publicDir, mongoConnect } from '../utils'
import { apiRouter } from './api'
import { authRouter } from './auth'
import { ErrorMessages } from '../constants'

declare module 'express-session' {
    interface Session {
        user?: string
    }
}

const app: Application = express()
let port: number = 8080
switch (process.env.NODE_ENV) {
    case 'production':
        port = 80
        break
    case 'stage':
        port = 8000
        break
    default:
        port = 8080
        break
}

/**
 * .env
 */
const envPath =
    process.env.NODE_ENV !== 'production'
        ? undefined
        : path.resolve(__dirname, '../', '../', '../', '.env.production')
detEnvConfig({ path: envPath })

/**
 * Session
 */
if (process.env.SESSION_SECRET && process.env.MONGO_URI) {
    const MongoDBStore = ConnectMongoDBSession(session)
    const store = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: 'sessions',
    })

    store.on('error', (e: Error) => {
        console.log(e)
    })

    app.use(
        session({
            secret: process.env.SESSION_SECRET || '',
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            },
            store,
            // Boilerplate options, see:
            // * https://www.npmjs.com/package/express-session#resave
            // * https://www.npmjs.com/package/express-session#saveuninitialized
            resave: true,
            saveUninitialized: true,
        }),
    )
}

app.use('/api', apiRouter)
app.use('/auth', authRouter)

/**
 * Assets
 */
app.get(
    /robots\.txt|manifest\.json|favicon\.ico|thumbnail\.png$/,
    (req, res) => {
        const html = `${publicDir}${req.url}`
        res.sendFile(html)
    },
)

app.get('/static(/*)', (req, res) => {
    res.sendFile(`${baseDir}/client${req.url}`)
})

/**
 * Show react frontend
 *
 * @param {Response} res
 * @return {void}
 */
export const showReact = async (res: Response): Promise<void> => {
    const filePath = path.resolve(publicDir, 'index.ejs')
    const bundleData = bundles()
    const html = await ejs
        .renderFile(filePath, {
            js: bundleData.filter((value) => value.endsWith('.js')),
            css: bundleData.filter((value) => value.endsWith('.css')),
        })
        .catch((e) => console.error(ErrorMessages.EJS_FAILED, e))

    res.send(html)
}

/**
 * React frontend
 */
app.use((_, res) => {
    showReact(res)
})

// start the Express server
app.listen(port, (): void => {
    console.log(`🤩 Server started at http://localhost:${port}`)
    mongoConnect()
        .then(() => console.log('🤩 Mongo DB connected'))
        .catch(() => console.error(ErrorMessages.MONGO_FAILED))
})
