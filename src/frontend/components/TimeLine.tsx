/*
 * TimeLine Wrapper Component
 */

import React, { useContext } from 'react'

import { useItems } from 'src/frontend/hooks'
import { Context, ContextType } from '../store'
import { openRemovePopup } from '../store/actions'
import { ItemExpiration } from './ItemExpiration'
import { ItemTitle } from './ItemTitle'

export const TimeLine = (): JSX.Element => {
    const [, dispatch] = useContext(Context) as ContextType
    const items = useItems()

    return (
        <section className="timeline">
            {items &&
                items.map((item, index) => {
                    const now = new Date()
                    const remains = Math.ceil(
                        (item.expiration.getTime() - now.getTime()) /
                            (1000 * 60 * 60 * 24), // Millisecond to Day
                    )
                    const classHurry =
                        remains < 15 ? 'timeline__item--button--hurry' : ''
                    const classDead =
                        remains < 0 ? 'timeline__item--button--dead' : ''
                    const evenRow = index % 2

                    return (
                        <div
                            key={`${item._id}`}
                            className={`timeline__item ${
                                evenRow ? 'timeline__item--even' : ''
                            }`}
                        >
                            <ItemTitle title={item.title} />
                            <button
                                className={`timeline__item--button ${classHurry} ${classDead}`}
                                onClick={() =>
                                    dispatch(openRemovePopup(item._id))
                                }
                            >
                                {remains}
                            </button>
                            <ItemExpiration expiration={item.expiration} />
                        </div>
                    )
                })}
        </section>
    )
}
