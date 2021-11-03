/*
 * TimeLine - Item - Expiration
 */

import React from 'react'
import { addZero } from 'src/utils'

type Props = {
    expiration: Date
}

export const ItemExpiration = (props: Props): JSX.Element => {
    const date = `${props.expiration.getFullYear()}-${addZero(
        props.expiration.getMonth() + 1,
    )}-${addZero(props.expiration.getDate())}`

    return <div className="timeline__item--expiration">{date}</div>
}
