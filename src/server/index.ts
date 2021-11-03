import 'module-alias/register'
import ejs from 'ejs'
import express, { Application, Response } from 'express'
import path from 'path'
import { baseDirDev, baseDirProd, bundles, isDev, publicDir } from 'src/utils'
import { mongoConnect } from 'src/utils'
import { apiRouter } from 'src/server/api'

const app: Application = express()
const port: number = process.env.NODE_ENV === 'development' ? 8080 : 8000 // default port to listen
require('dotenv').config()

app.use('/api', apiRouter)

/**
 * Assets
 */
app.get(/robots\.txt|manifest\.json|favicon\.ico$/, (req, res) => {
    const html = `${publicDir}${req.url}`
    res.sendFile(html)
})

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
        .catch((e) => console.error(e))

    res.send(html)
}

/**
 * React frontend
 */
app.use(function (_, res) {
    showReact(res)
})

// start the Express server
app.listen(port, (): void => {
    // tslint:disable-next-line: no-console
    console.log(`🤩 Server started at http://localhost:${port}`)
    mongoConnect()
})
