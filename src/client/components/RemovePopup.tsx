/*
 * TimeLine Wrapper Component
 */

import React, { useContext, useEffect, useRef } from 'react'

import { useRemoveItem } from 'src/client/hooks'
import { Context, ContextType, closeRemovePopup } from 'src/client/store'

export const RemovePopup = (): JSX.Element => {
    const [{ removePopup }, dispatch] = useContext(Context) as ContextType
    const removeItem = useRemoveItem()
    const submitButton = useRef<HTMLButtonElement>(null)

    const onDeleteClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault()
        if (typeof removePopup === 'string') {
            removeItem(removePopup)
        }
        dispatch(closeRemovePopup())
    }

    useEffect(() => {
        submitButton.current && submitButton.current.focus()
    }, [submitButton])

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            dispatch(closeRemovePopup())
        }
        if (e.key === 'Enter') {
            onDeleteClick(e)
        }
    }

    return (
        <div className="overlay">
            <section className="modal">
                <p>Do you really want to remove this item?</p>
                <button
                    onClick={() => dispatch(closeRemovePopup())}
                    className="input__cancel"
                    onKeyDown={onKeyDown}
                >
                    Cancel
                </button>
                <button
                    className="input__execution"
                    onClick={onDeleteClick}
                    ref={submitButton}
                    onKeyDown={onKeyDown}
                >
                    Remove Item
                </button>
            </section>
        </div>
    )
}
