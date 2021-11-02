/**
 * Hello document model
 */

import mongoose, { Schema } from 'mongoose'
import { Hello } from 'src/types'

const helloSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
})

const HelloModel = mongoose.model<Hello>('hello', helloSchema)

export const getHello = async (): Promise<Hello> => {
    return await HelloModel.findOne()
        .then((hello) => {
            if (!hello) {
                throw new Error('🤬 Cannot find hello')
            }
            return hello
        })
        .catch((e) => {
            throw new Error('🤬 Cannot find hello')
        })
}
