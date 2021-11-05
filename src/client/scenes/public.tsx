/*
 * Public Wrapper Component
 */

import React, { Fragment, useContext } from 'react'

import { Context, ContextType } from 'src/client/store'
import {
    AddItemForm,
    Header,
    RemovePopup,
    TimeLine,
} from 'src/client/components'

import 'src/assets/styles/style.scss'

export const Public = (): JSX.Element => {
    const [{ user, removePopup }] = useContext(Context) as ContextType
    const classPublic = !user ? 'wrapper--public' : ''
    const classDarkMode = user?.darkMode ? 'wrapper--dark-mode' : ''

    return (
        <Fragment>
            {/* Profile image preload */}
            {user?.photo && <link rel="preload" as="image" href={user.photo} />}

            <div className={`wrapper ${classPublic} ${classDarkMode}`}>
                {removePopup && <RemovePopup />}
                <Header />
                <AddItemForm />
                <TimeLine />
            </div>
        </Fragment>
    )
}
