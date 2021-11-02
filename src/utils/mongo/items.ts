/**
 * Hello document model
 */

import mongoose, { Schema } from 'mongoose'
import { Item } from 'src/types'

const itemsSchema = new Schema({
    expire: {
        type: Date,
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
        .sort([['expire', 1]])
        .then((items) => {
            if (!items) {
                throw new Error('🤬 Cannot find items')
            }
            return items
        })
        .catch((e) => {
            throw new Error('🤬 Cannot find items')
        })
}
