/*
 * Public Wrapper Component
 * scenes/public
 */

import React from 'react'

import { useItems } from 'src/frontend/hooks'

export const Public = (): JSX.Element => {
    const items = useItems()

    return (
        <table>
            <tbody>
                {items &&
                    items.map((item, index) => {
                        const expire = new Date(item.expire)
                        return (
                            <tr key={`${item.expire}-${item.title}`}>
                                <td>
                                    {index % 2 === 0
                                        ? expire.toDateString()
                                        : item.title}
                                </td>
                                <td></td>
                                <td>
                                    {index % 2 === 0
                                        ? item.title
                                        : expire.toDateString()}
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}
