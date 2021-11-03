/*
 * Public Wrapper Component
 */

import React, { Fragment, useContext } from 'react'

import { Form } from 'src/client/components/Form'
import { RemovePopup } from 'src/client/components/RemovePopup'
import { TimeLine } from 'src/client/components/TimeLine'
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
