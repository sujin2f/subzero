/*
 * TimeLine - Item - Title
 */

import React, { Fragment, useContext } from 'react'

import { Context, ContextType } from 'src/client/store'

export const Header = (): JSX.Element => {
    const [{ user }] = useContext(Context) as ContextType
    return (
        <Fragment>
            {!user && (
                <div className="banner">
                    <h1 className="banner__heading">Manage Your Groceries</h1>
                    <p className="banner__description">Try out from below</p>
                    <a className="login" href="/auth/login">
                        Login
                    </a>
                </div>
            )}
            {user && (
                <a className="logout" href="/auth/logout" title="Logout">
                    <div />
                </a>
            )}
        </Fragment>
    )
}
