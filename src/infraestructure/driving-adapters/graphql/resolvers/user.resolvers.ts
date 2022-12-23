import { MongoDBUserRepository } from '../../../implementations/Mongodb/MongoDBUserRepository'
import { User } from 'domain/entities/User'
import { GraphQLError } from 'graphql'
import { UserGetterUseCase } from '../../../../application/use-cases/UserGet'
import { UserCreatorUseCase } from '../../../../application/use-cases/UserCreator'
import { UserUpdaterUseCase } from '../../../../application/use-cases/UserUpdater'
import { UserDeleterUseCase } from '../../../../application/use-cases/UserDeleter'
import crypto from 'crypto'
const userRepository = new MongoDBUserRepository()

const userResolvers = {
    Query: {
        getUsers: async () => {
            try {
                const usersGetter = new UserGetterUseCase(userRepository)

                const users = await usersGetter.run()

                return users
            } catch (error) {
                console.log(error)
                throw new GraphQLError('Failed execution of query')
            }
        },
    },
    Mutation: {
        createUser: async (root: any, args: any, context: any) => {
            try {
                const { user } = args

                const newUser: User = {
                    id: crypto.randomUUID(),
                    username: user.username,
                    name: user.name,
                    age: user.age,
                }

                const userCreator = new UserCreatorUseCase(userRepository)

                const createdUser = await userCreator.run(newUser)

                return createdUser
            } catch (error) {
                console.log(error)
                throw new GraphQLError('Failed execution of query')
            }
        },
        editUser: async (root: any, args: any, context: any) => {
            try {
                const { user } = args

                const userUpdater = new UserUpdaterUseCase(userRepository)

                const editedUser = await userUpdater.run(user)

                return editedUser
            } catch (error) {
                console.log(error)
                throw new GraphQLError('Failed execution of query')
            }
        },
        deleteUser: async (root: any, args: any, context: any) => {
            try {
                const { userId } = args

                const userDeleter = new UserDeleterUseCase(userRepository)

                await userDeleter.run(userId)

                return userId
            } catch (error) {
                console.log(error)
                throw new GraphQLError('Failed execution of query')
            }
        },
    },
}

export default userResolvers
