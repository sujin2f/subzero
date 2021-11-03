import { Item } from '.'

export type State = {
    hello: string
    items?: Item[]
    removePopup: string | false
}

export type Action = {
    type: string
    hello: string
    items: Item[]
    _id: string
}
