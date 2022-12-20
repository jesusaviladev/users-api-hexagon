import mongoose from 'mongoose'

export const connectToDatabase = async (url: string) => {
    mongoose.set('strictQuery', true)

    await mongoose.connect(url, {
        dbName: process.env.DATABASE_NAME,
    })

    console.log('Connected to Database')
}
