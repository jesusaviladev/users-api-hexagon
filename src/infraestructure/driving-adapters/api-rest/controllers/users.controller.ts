import { NextFunction, Request, Response } from 'express'
import { User } from 'domain/entities/User'
import { randomUUID } from 'crypto'
import { UserCreatorUseCase } from '../../../../application/use-cases/UserCreator/index'
import { UserGetterUseCase } from '../../../../application/use-cases/UserGet'
import { InMemoryUserRepository } from '../../../../infraestructure/implementations/InMemory/InMemoryUserRepository'

const userRepository = new InMemoryUserRepository()

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
        res.status(201).json(createdUser)
    } catch (error) {
        next(error)
    }
}
