/*
 * Public Wrapper Component
 * scenes/public
 */

import React from 'react'

import { useHello } from 'src/frontend/hooks'
import { ReactChildrenProps } from 'src/types'

export const Public = (props: ReactChildrenProps): JSX.Element => {
    const hello = useHello()

    return (
        <div>
            <div>{hello}</div>
            <div>{props.children}</div>
        </div>
    )
}
