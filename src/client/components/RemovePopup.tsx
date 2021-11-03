/*
 * TimeLine Wrapper Component
 */

import React, { useContext } from 'react'

import { useRemoveItem } from 'src/client/hooks'
import { Context, ContextType } from 'src/client/store'
import { closeRemovePopup } from 'src/client/store/actions'

export const RemovePopup = (): JSX.Element => {
    const [{ removePopup }, dispatch] = useContext(Context) as ContextType
    const removeItem = useRemoveItem()

    const onDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (typeof removePopup === 'string') {
            removeItem(removePopup)
        }
        dispatch(closeRemovePopup())
    }

    return (
        <div className="overlay">
            <section className="modal">
                <p>Do you really want to remove this item?</p>
                <button
                    onClick={() => dispatch(closeRemovePopup())}
                    className="input__cancel"
                >
                    Cancel
                </button>
                <button className="input__execution" onClick={onDeleteClick}>
                    Remove Item
                </button>
            </section>
        </div>
    )
}
