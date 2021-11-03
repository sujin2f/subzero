/*
 * Public Wrapper Component
 */

import React, { Fragment, useContext } from 'react'

import { Form } from '../components/Form'
import { RemovePopup } from '../components/RemovePopup'
import { TimeLine } from '../components/TimeLine'
import { Context, ContextType } from '../store'

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
