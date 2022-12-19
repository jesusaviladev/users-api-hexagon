import { User } from 'domain/entities/User'
import { UserNameAlreadyExistsException } from '../../../domain/exceptions/UserAlreadyExistsException'
import { UserRepository } from 'domain/repositories/UserRepository'
import { ExistsUserByUserName } from '../../../domain/services/ExistsUserByUserName'

export class UserCreatorUseCase {
    private readonly _userRepository: UserRepository
    private readonly _existsUserByUserName: ExistsUserByUserName

    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository
        this._existsUserByUserName = new ExistsUserByUserName(userRepository)
    }

    async run(body: User): Promise<User> {
        const userExists: boolean = await this._existsUserByUserName.run(
            body.username
        )

        if (userExists) throw new UserNameAlreadyExistsException()

        const userCreated = await this._userRepository.save(body)

        return userCreated
    }
}
