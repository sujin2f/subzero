import { Item } from '.'

export type State = {
    items?: Item[]
    removePopup: string | false
}

export type Action = {
    type: string
    items: Item[]
    _id: string
}
