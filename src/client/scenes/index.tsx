/*
 * Public Wrapper Component
 */

import React, { Fragment, useContext } from 'react'

import { Form, RemovePopup, TimeLine } from 'src/client/components'
import { Context, ContextType } from 'src/client/store'

export const Public = (): JSX.Element => {
    const [{ removePopup }] = useContext(Context) as ContextType
    return (
        <Fragment>
            {removePopup && <RemovePopup />}
            <Form />
            <TimeLine />
        </Fragment>
    )
}
