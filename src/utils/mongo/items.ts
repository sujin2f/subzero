import mongoose, { Schema } from 'mongoose'
import { Item } from 'src/types'

const itemsSchema = new Schema({
    expiration: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
})

const ItemsModel = mongoose.model<Item>('item', itemsSchema)

export const getItems = async (): Promise<Item[]> => {
    return await ItemsModel.find()
        .sort([['expiration', 1]])
        .then((items) => {
            if (!items) {
                throw new Error('🤬 Cannot find items')
            }
            return items
        })
        .catch(() => {
            throw new Error('🤬 Cannot find items')
        })
}

export const createItem = async (
    title: string,
    expiration: string,
): Promise<Item> => {
    const item = {
        title,
        expiration,
    }
    const itemModel = new ItemsModel(item)

    return await itemModel.save().catch(() => {
        throw new Error('🤬 Cannot create an item.')
    })
}

export const removeItem = async (_id: string): Promise<boolean> => {
    const result = await ItemsModel.deleteOne({ _id })
    if (result.deletedCount > 0) {
        return true
    }

    throw new Error('🤬 Item removal failed.')
}
