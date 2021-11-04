import { Item } from 'src/types'
import {
    getItems as getMongoItems,
    createItem as createMongoItem,
    removeItem as removeMongoItem,
} from 'src/utils/mongo/items'

export const getItems = async (userId?: string): Promise<Item[]> => {
    return await getMongoItems(userId).catch((e) => {
        throw e
    })
}

export const createItem = async (
    title: string,
    expiration: string,
    userId?: string,
): Promise<Item> => {
    return await createMongoItem(title, expiration, userId).catch((e) => {
        throw e
    })
}

export const removeItem = async (
    id: string,
    userId?: string,
): Promise<boolean> => {
    return await removeMongoItem(id, userId)
        .then(() => true)
        .catch((e) => {
            throw e
        })
}
