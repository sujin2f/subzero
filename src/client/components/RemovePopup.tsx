/*
 * TimeLine Wrapper Component
 */

import React, { useContext, useEffect, useRef } from 'react'

import { useRemoveItem } from 'src/client/hooks'
import { Context, ContextType } from 'src/client/store'
import { closeRemovePopup } from 'src/client/store/actions'

export const RemovePopup = (): JSX.Element => {
    const [{ removePopup }, dispatch] = useContext(Context) as ContextType
    const removeItem = useRemoveItem()
    const submitButton = useRef<HTMLButtonElement>(null)

    const onDeleteClick = (e: React.MouseEvent | KeyboardEvent) => {
        e.preventDefault()
        if (typeof removePopup === 'string') {
            removeItem(removePopup)
        }
        dispatch(closeRemovePopup())
    }

    useEffect(() => {
        submitButton.current && submitButton.current.focus()
    }, [submitButton])

    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dispatch(closeRemovePopup())
        }
        if (e.key === 'Enter') {
            onDeleteClick(e)
        }
    })

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
                <button
                    className="input__execution"
                    onClick={onDeleteClick}
                    ref={submitButton}
                >
                    Remove Item
                </button>
            </section>
        </div>
    )
}
