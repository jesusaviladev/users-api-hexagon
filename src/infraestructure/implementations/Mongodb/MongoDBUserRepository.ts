import { User } from 'domain/entities/User'
import { UserRepository } from 'domain/repositories/UserRepository'
import UserModel, { IUserModel } from './schemas/user.schema'
import mongoose from 'mongoose'

export class MongoDBUserRepository implements UserRepository {
    private _model: mongoose.Model<IUserModel>

    constructor() {
        this._model = UserModel
    }

    async getAll(): Promise<User[]> {
        const users = await this._model.find({})

        return users.map((user: any) => ({
            id: user._id,
            username: user.username,
            name: user.name,
            age: user.age,
        }))
    }

    async getById(userId: string): Promise<User | null> {
        const user = await this._model.findById(userId)

        if (!user) return null

        return {
            id: user._id,
            username: user.username,
            name: user.name,
            age: user.age,
        }
    }

    async getByUsername(username: string): Promise<User | null> {
        const user = await this._model.findOne({
            username,
        })

        if (!user) return null

        return {
            id: user._id,
            username: user.username,
            name: user.name,
            age: user.age,
        }
    }

    async save(user: User) {
        const newUser = new this._model(user)

        await newUser.save()

        return {
            id: newUser._id,
            username: newUser.username,
            name: newUser.name,
            age: newUser.age,
        }
    }

    async update(user: User): Promise<User> {
        const updatedUser = await this._model.findByIdAndUpdate(user.id, user, {
            new: true,
        })

        return {
            id: updatedUser!._id,
            username: updatedUser!.username,
            name: updatedUser!.name,
            age: updatedUser!.age,
        }
    }

    async delete(userId: string): Promise<void> {
        await this._model.findByIdAndDelete(userId)
    }
}
