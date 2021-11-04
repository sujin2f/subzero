import mongoose, { Schema } from 'mongoose'
import { User } from 'src/types'

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
})

const UsersModel = mongoose.model<User>('user', usersSchema)

export const getUserByEmail = async (email: string): Promise<User> => {
    return await UsersModel.findOne({ email })
        .then((user) => {
            if (!user) {
                throw new Error('')
            }
            return user
        })
        .catch(() => {
            throw new Error('')
        })
}

export const getUserById = async (_id: string): Promise<User> => {
    return await UsersModel.findOne({ _id })
        .then((user) => {
            if (!user) {
                throw new Error('')
            }
            return user
        })
        .catch(() => {
            throw new Error('')
        })
}

export const getOrAddUser = async (
    name: string,
    email: string,
    photo?: string,
): Promise<User> => {
    const result = await getUserByEmail(email).catch(async () => {
        const user = new UsersModel({
            email,
            name,
            photo,
        })

        const result = await user.save()
        return result
    })

    return result as User
}
