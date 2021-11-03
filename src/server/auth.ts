/**
 * Login features endpoint
 */

/* istanbul ignore file */
import express from 'express'
import { Session } from 'express-session'
import { User } from 'src/types'
import { isDev } from 'src/utils'
import { getGoogleAccountFromCode, GoogleLoginUrl } from 'src/utils/google-api'
import { getOrAddUser, getUserByEmail } from 'src/utils/mongo/users'

declare module 'express-session' {
    interface Session {
        user?: string
    }
}

const authRouter = express.Router()

/**
 * Login
 * In dev server, it automatically log a user in credential in
 * Otherwise, it redirects to the Google login
 */
authRouter.get('/login', async (req, res) => {
    if (isDev()) {
        const devUser = await getUserByEmail(process.env.DEV_USER_EMAIL || '')
        if (devUser) {
            ;(req.session as Session).user = devUser._id
            res.redirect('/')
            return
        }
    }

    if ((req.session as Session).user) {
        res.redirect('/')
    }
    res.redirect(GoogleLoginUrl())
    return
})

/**
 * Logout
 */
authRouter.get('/logout', (req, res) => {
    ;(req.session as Session).user = undefined
    res.redirect('/')
})

/**
 * Google login redirected
 */
authRouter.get('/', async (req, res) => {
    if ((req.session as Session).user) {
        res.redirect('/')
    }

    const code = req.query.code as string

    if (!code || !req.session) {
        res.redirect('/auth/error')
        return
    }

    await getGoogleAccountFromCode(code)
        .then((account: User) => {
            getOrAddUser(account.name, account.email, account.photo)
                .then((user: User) => {
                    ;(req.session as Session).user = user._id
                    res.redirect('/')
                })
                .catch(() => {
                    res.redirect('/auth/error')
                })
        })
        .catch(() => {
            res.redirect('/auth/error')
        })
})

export { authRouter }
