/*
 * Public Wrapper Component
 */

import React, { Fragment, useContext } from 'react'

import { Context, ContextType } from 'src/client/store'
import { PublicDark } from './public-dark'

import { PublicLight } from './public-light'

export const Public = (): JSX.Element => {
    const [{ user }] = useContext(Context) as ContextType

    return (
        <Fragment>
            {user?.photo && <link rel="preload" as="image" href={user.photo} />}

            {user?.darkMode && <PublicDark />}
            {!user?.darkMode && <PublicLight />}
        </Fragment>
    )
}
