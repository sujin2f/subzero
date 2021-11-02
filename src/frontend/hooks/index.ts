import { useContext, useEffect } from 'react'
import { gql } from '@apollo/client'

import { graphqlClient } from 'src/utils'
import { ContextType, Context, setHello } from 'src/frontend/store'
import { Hello } from 'src/types'

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
