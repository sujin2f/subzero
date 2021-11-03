import { Item } from 'src/types'
import {
    getItems as getMongoItems,
    createItem as createMongoItem,
    removeItem as removeMongoItem,
} from 'src/utils/mongo/items'

export const getItems = async (): Promise<Item[]> => {
    return await getMongoItems().catch((e) => {
        throw e
    })
}

export const createItem = async ({
    title,
    expiration,
}: Item): Promise<boolean> => {
    return await createMongoItem(title, expiration)
        .then(() => true)
        .catch((e) => {
            throw e
        })
}

export const removeItem = async (id: string): Promise<boolean> => {
    return await removeMongoItem(id)
        .then(() => true)
        .catch((e) => {
            throw e
        })
}
