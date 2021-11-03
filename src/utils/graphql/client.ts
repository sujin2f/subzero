import fetch from 'cross-fetch'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const graphqlClient = new ApolloClient({
    link: new HttpLink({ uri: '/api', fetch }),
    cache: new InMemoryCache(),
})
