import { UserRepository } from 'domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'

export class UserDeleterUseCase {
    private readonly _userRepository: UserRepository
    private readonly _findUserById: UserGetterById

    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository
        this._findUserById = new UserGetterById(userRepository)
    }

    async run(userId: string) {
        const user = await this._findUserById.run(userId)

        await this._userRepository.delete(user.id)
    }
}
