import { User } from 'domain/entities/User'
import { UserNotFoundException } from 'domain/exceptions/UserNotFoundException'
import { UserRepository } from 'domain/repositories/UserRepository'

export class UserGetterById {
    private readonly _userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository
    }

    async run(UserId: string): Promise<User | null> {
        const user = await this._userRepository.getById(UserId)

        if (!user) throw new UserNotFoundException()

        return user
    }
}
