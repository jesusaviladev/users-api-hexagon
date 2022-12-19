import { User } from 'domain/entities/User'
import { UserRepository } from 'domain/repositories/UserRepository'
import { UserGetterById } from 'domain/services/UserGetterById'

export class UserUpdaterUseCase {
    private readonly _userRepository: UserRepository
    private readonly _findUserById: UserGetterById

    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository
        this._findUserById = new UserGetterById(userRepository)
    }

    async run(body: User): Promise<User> {
        const user = this._findUserById.run(body.id)

        const dataToUpdate = {
            ...user,
            ...body,
        }

        const updatedUser = await this._userRepository.update(dataToUpdate)

        return updatedUser
    }
}
