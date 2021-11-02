/*
 * Public Wrapper Component
 * scenes/public
 */

import React from 'react'

import { useTest } from 'src/frontend/hooks'
import { ReactChildrenProps } from 'src/types'

export const Public = (props: ReactChildrenProps): JSX.Element => {
    const test = useTest()

    return (
        <div>
            <div>{test ? 'true' : 'false'}</div>
            <div>{props.children}</div>
        </div>
    )
}
