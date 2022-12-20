import { NextFunction, Request, Response } from 'express'
import { User } from 'domain/entities/User'
import { randomUUID } from 'crypto'
import { UserCreatorUseCase } from '../../../../application/use-cases/UserCreator/index'
import { UserGetterUseCase } from '../../../../application/use-cases/UserGet'
import { UserUpdaterUseCase } from '../../../../application/use-cases/UserUpdater'
// import { InMemoryUserRepository } from '../../../../infraestructure/implementations/InMemory/InMemoryUserRepository'
import { MongoDBUserRepository } from '../../../../infraestructure/implementations/Mongodb/MongoDBUserRepository'
import { UserDeleter } from '../../../../application/use-cases/UserDeleter'

const userRepository = new MongoDBUserRepository()

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const usersGetter = new UserGetterUseCase(userRepository)

        const users = await usersGetter.run()

        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, username, age } = req.body
    const userCreator = new UserCreatorUseCase(userRepository)

    try {
        const newUser: User = {
            id: randomUUID(),
            name,
            username,
            age,
        }

        const createdUser = await userCreator.run(newUser)
        return res.status(201).json(createdUser)
    } catch (error) {
        next(error)
    }
}

export const editUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body

        const userUpdater = new UserUpdaterUseCase(userRepository)

        const updatedUser = await userUpdater.run(data)

        return res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params

        const userDeleter = new UserDeleter(userRepository)

        await userDeleter.run(userId)

        return res.status(204).end()
    } catch (error) {
        next(error)
    }
}
