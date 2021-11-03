/*
 * TimeLine Wrapper Component
 */

import React, { useContext } from 'react'

import { useItems } from 'src/client/hooks'
import { Context, ContextType } from 'src/client/store'
import { openRemovePopup } from 'src/client/store/actions'
import { ItemExpiration } from 'src/client/components/ItemExpiration'
import { ItemTitle } from 'src/client/components/ItemTitle'

export const TimeLine = (): JSX.Element => {
    const [, dispatch] = useContext(Context) as ContextType
    const items = useItems()

    return (
        <section className="timeline">
            {items &&
                items.map((item, index) => {
                    const now = new Date()
                    now.setHours(0)
                    now.setMinutes(0)
                    now.setSeconds(0)
                    const remains =
                        Math.ceil(
                            (item.expiration.getTime() - now.getTime()) /
                                (1000 * 60 * 60 * 24), // Millisecond to Day
                        ) - 1
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
                                {remains > 999 ? '1k+' : remains}
                            </button>
                            <ItemExpiration expiration={item.expiration} />
                        </div>
                    )
                })}
        </section>
    )
}
