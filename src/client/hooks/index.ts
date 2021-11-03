import { useContext, useEffect } from 'react'
import { gql } from '@apollo/client'

import { graphqlClient } from 'src/utils'
import {
    ContextType,
    Context,
    setHello,
    getItemsSuccess,
    getItemsInit,
    getItemsFail,
} from 'src/client/store'
import { Fn, Hello, Item } from 'src/types'

export const useHello = (): string => {
    const [{ hello }, dispatch] = useContext(Context) as ContextType

    useEffect(() => {
        if (hello) {
            return
        }
        graphqlClient
            .query<{ hello: Hello }>({
                query: gql`
                    query {
                        hello {
                            title
                        }
                    }
                `,
            })
            .then((response) => {
                dispatch(setHello(response.data.hello.title))
            })
            .catch((e: Error) => {
                dispatch(setHello(e.message))
            })
    }, [dispatch, hello])

    return hello
}

export const useItems = (): Item[] => {
    const [{ items }, dispatch] = useContext(Context) as ContextType

    useEffect(() => {
        if (items) {
            return
        }
        dispatch(getItemsInit())
        graphqlClient
            .query<{ getItems: Item[] }>({
                query: gql`
                    query {
                        getItems {
                            _id
                            expiration
                            title
                        }
                    }
                `,
            })
            .then((response) => {
                dispatch(
                    getItemsSuccess(
                        response.data.getItems.map((item) => ({
                            ...item,
                            expiration: new Date(item.expiration),
                        })),
                    ),
                )
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
        items && items.push(item)
        const newItems = items
            ? items.sort(
                  (prev, next) =>
                      prev.expiration.getTime() - next.expiration.getTime(),
              )
            : [item]

        graphqlClient
            .mutate({
                mutation: gql`
                    mutation {
                        createItem(
                            title: "${item.title}", expiration: "${item.expiration}"
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
