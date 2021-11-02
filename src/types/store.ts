import { Item } from '.'

export type State = {
    hello: string
    items?: Item[]
}

export type Action = {
    type: string
    hello: string
    items: Item[]
}
