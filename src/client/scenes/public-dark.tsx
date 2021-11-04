/*
 * Public Wrapper Component
 */

import React, { useContext } from 'react'

import {
    AddItemForm,
    Header,
    RemovePopup,
    TimeLine,
} from 'src/client/components'
import { Context, ContextType } from 'src/client/store'

import 'src/assets/styles/style-dark-mode.scss'

export const PublicDark = (): JSX.Element => {
    const [{ user, removePopup }] = useContext(Context) as ContextType

    return (
        <div className="wrapper--dark-mode">
            <div className={`wrapper ${(!user && 'wrapper--public') || ''}`}>
                {removePopup && <RemovePopup />}
                <Header />
                <AddItemForm />
                <TimeLine />
            </div>
        </div>
    )
}
