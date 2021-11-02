/**
 * MongoDB connection helpers
 */

import mongoose from 'mongoose'

/**
 * MongoDB connect
 * @return {Promise<typeof mongoose>}
 * @throw Database connection failure
 */
export const mongoConnect = async (): Promise<typeof mongoose> => {
    const uri = process.env.MONGO_URI
    const user = process.env.MONGO_USER
    const pass = process.env.MONGO_PASSWORD
    const dbName = process.env.MONGO_DATABASE

    return mongoose
        .connect(uri || '', {
            user,
            pass,
            dbName,
        })
        .then((db) => {
            console.log('🤩 Mongo DB connected')
            return db
        })
        .catch((e) => {
            console.error('🤬 Mongo DB connection failed')
            throw e
        })
}
