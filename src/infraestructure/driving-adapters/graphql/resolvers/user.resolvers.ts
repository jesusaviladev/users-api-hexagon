import { MongoDBUserRepository } from '../../../implementations/Mongodb/MongoDBUserRepository'
import { UserGetterUseCase } from '../../../../application/use-cases/UserGet'

const userRepository = new MongoDBUserRepository()

const userResolvers = {
    Query: {
        getUsers: async () => {
            try {
                const usersGetter = new UserGetterUseCase(userRepository)

                const users = await usersGetter.run()

                return users
            } catch (error) {
                throw new Error()
            }
        },
        getUser: () => {},
    },
    Mutation: {
        createUser: () => {},
        editUser: () => {},
        deleteUser: () => {},
    },
}

export default userResolvers
