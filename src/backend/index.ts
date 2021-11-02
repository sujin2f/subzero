import 'module-alias/register'
import ejs from 'ejs'
import express, { Application, Response } from 'express'
import path from 'path'
import { baseDirDev, baseDirProd, bundles, isDev, publicDir } from 'src/utils'

const app: Application = express()
const port: number = process.env.NODE_ENV === 'development' ? 8080 : 80 // default port to listen

/**
 * Assets
 */
app.get('/assets(/*)', (req, res) => {
    const html = `${publicDir}/${req.url}`
    res.sendFile(html)
})

app.get('/robots.txt', (_, res) => {
    const html = `${publicDir}/robots.txt`
    res.sendFile(html)
})

app.get('/static(/*)', (req, res) => {
    if (isDev()) {
        const html = `${baseDirDev}${req.url}`
        res.sendFile(html)
    } else {
        const html = `${baseDirProd}${req.url}`
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
    if (!isDev()) {
        res.sendFile(path.resolve(baseDirProd, 'index.html'))
        return
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const filePath = path.resolve(publicDir, 'frontend.html')
    const html = await ejs
        .renderFile(filePath, {
            bundles: [...bundles()],
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
    console.log(`server started at http://localhost:${port}`)
})
