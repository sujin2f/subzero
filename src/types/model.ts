export type Item = {
    _id: string
    title: string
    expiration: string
}

export type User = {
    _id: string
    email: string
    name: string
    photo?: string
    darkMode?: boolean
}
