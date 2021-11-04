import { useContext, useEffect } from 'react'
import { gql } from '@apollo/client'

import { graphqlClient, yyyyMmDdToDate } from 'src/utils'
import {
    ContextType,
    Context,
    getItemsSuccess,
    getItemsInit,
    getItemsFail,
    setUser,
    unsetUser,
} from 'src/client/store'
import { Fn, Item, User } from 'src/types'

export const useItems = (): Item[] => {
    const [{ items }, dispatch] = useContext(Context) as ContextType

    useEffect(() => {
        if (items) {
            return
        }
        dispatch(getItemsInit())
        graphqlClient
            .query<{ getItems: Item[]; getUser?: User }>({
                query: gql`
                    query {
                        getItems {
                            _id
                            expiration
                            title
                        }
                        getUser {
                            name
                            email
                            photo
                        }
                    }
                `,
            })
            .then((response) => {
                dispatch(getItemsSuccess(response.data.getItems))
                if (response.data.getUser) {
                    dispatch(setUser(response.data.getUser))
                } else {
                    dispatch(unsetUser())
                }
            })
            .catch(() => {
                dispatch(getItemsFail())
            })
    }, [dispatch, items])

    return items || []
}

export const useCreateItem = (): Fn<[Item], void> => {
    const [{ items }, dispatch] = useContext(Context) as ContextType

    return (item: Item) => {
        graphqlClient
            .mutate({
                mutation: gql`
                    mutation {
                        createItem(
                            title: "${item.title}", expiration: "${item.expiration}"
                        ) {
                            _id
                            expiration
                            title
                        }
                    }
                `,
            })
            .then((result) => {
                items && items.push(result.data.createItem)
                const newItems = items
                    ? items.sort(
                          (prev, next) =>
                              yyyyMmDdToDate(prev.expiration).getTime() -
                              yyyyMmDdToDate(next.expiration).getTime(),
                      )
                    : [item]

                dispatch(getItemsSuccess(newItems))
            })
            .catch(() => {
                // Error Handling
            })
    }
}

export const useRemoveItem = (): Fn<[string], void> => {
    const [{ items }, dispatch] = useContext(Context) as ContextType

    return (_id: string) => {
        const newItems = items ? items.filter((item) => item._id !== _id) : []

        graphqlClient
            .mutate({
                mutation: gql`
                    mutation {
                        removeItem(
                            _id: "${_id}"
                        )
                    }
                `,
            })
            .then(() => dispatch(getItemsSuccess(newItems)))
            .catch(() => {
                // Error Handling
            })
    }
}
