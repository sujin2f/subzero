/* tslint:disable: no-console */
import 'module-alias/register'
import ejs from 'ejs'
import express, { Application, Response } from 'express'
import path from 'path'
import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'
import { config as detEnvConfig } from 'dotenv'

import {
    baseDirDev,
    baseDirProd,
    bundles,
    isDev,
    publicDir,
    mongoConnect,
} from 'src/utils'
import { apiRouter } from 'src/server/api'
import { authRouter } from 'src/server/auth'
import { ErrorMessages } from 'src/constants'

declare module 'express-session' {
    interface Session {
        user?: string
    }
}

const app: Application = express()
const port: number = isDev() ? 8080 : 80 // default port to listen

/**
 * .env
 */
const envPath = isDev()
    ? undefined
    : path.resolve(__dirname, '../', '../', '.env.production')
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
    if (isDev()) {
        const html = `${baseDirDev}${req.url}`
        res.sendFile(html)
    } else {
        const html = `${baseDirProd}/client/${req.url}`
        res.sendFile(html)
    }
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
    mongoConnect().catch(() => console.error(ErrorMessages.MONGO_FAILED))
})
