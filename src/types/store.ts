import { Item, User } from '.'

export type State = {
    user?: User
    items?: Item[]
    removePopup: string | false
}

export type Action = {
    type: string
    items: Item[]
    _id: string
    user: User
}
