import mongoose from 'mongoose'

export interface IUserModel {
    _id: string
    name: string
    username: string
    age: number
}

const userSchema = new mongoose.Schema<IUserModel>({
    _id: {
        type: String,
        _id: false,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
})

const UserModel = mongoose.model<IUserModel>('User', userSchema)

export default UserModel
