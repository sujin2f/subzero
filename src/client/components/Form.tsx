/*
 * TimeLine Wrapper Component
 */

import React, { useState, useRef, useEffect } from 'react'
import { useCreateItem } from 'src/client/hooks'

export const Form = (): JSX.Element => {
    const [opened, updateOpened] = useState<boolean>(false)
    const formElement = useRef<HTMLFormElement>(null)
    const titleElement = useRef<HTMLInputElement>(null)
    const dateElement = useRef<HTMLInputElement>(null)
    const createItem = useCreateItem()

    const openForm = () => {
        updateOpened(true)
        titleElement.current && titleElement.current.focus()
    }
    const closeForm = (
        e: React.MouseEvent | React.KeyboardEvent | React.FormEvent,
    ) => {
        e.preventDefault()
        updateOpened(false)
    }
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeForm(e)
        }
        if (e.key === 'Enter') {
            executeForm(e)
        }
    }
    const executeForm = (e: React.FormEvent) => {
        e.preventDefault()
        const title = titleElement.current?.value
        const date = dateElement.current?.value
        if (!title || !date) {
            // @todo Error
            return
        }
        createItem({ _id: '', title, expiration: new Date(date) })
        titleElement.current!.value = ''
        dateElement.current!.value = ''
        closeForm(e)
    }

    useEffect(() => {
        opened && titleElement.current && titleElement.current.focus()
    }, [titleElement, opened])

    return (
        <section className="input__wrapper">
            {opened && (
                <form
                    ref={formElement}
                    className="input"
                    onSubmit={executeForm}
                >
                    <label htmlFor="name">Item Name</label>
                    <input
                        id="name"
                        type="text"
                        className="input__field"
                        ref={titleElement}
                        onKeyDown={onKeyDown}
                        onFocus={openForm}
                    />
                    <label htmlFor="expiration">Expiration Date</label>
                    <input
                        id="expiration"
                        type="datetime-local"
                        className="input__field"
                        onKeyDown={onKeyDown}
                        ref={dateElement}
                    />
                    <button onClick={closeForm} className="input__cancel">
                        Cancel
                    </button>
                    <button className="input__execution" type="submit">
                        Add Item
                    </button>
                </form>
            )}
            {!opened && (
                <button
                    className="input__button"
                    aria-label="Add item"
                    onClick={openForm}
                >
                    <div className="input__button__icon" />
                    <div className="input__button__icon" />
                </button>
            )}
        </section>
    )
}
