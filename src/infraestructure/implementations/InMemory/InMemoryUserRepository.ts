import { User } from 'domain/entities/User'
import { UserRepository } from 'domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
    private readonly userData: User[] = []

    async getAll(): Promise<User[]> {
        return this.userData
    }

    async getByUsername(username: string): Promise<User | null> {
        const user = this.userData.find((user) => user.username === username)

        if (!user) return null

        return user
    }

    async getById(userId: string): Promise<User | null> {
        const user = this.userData.find((user) => user.id === userId)

        if (!user) return null

        return user
    }

    async save(user: User): Promise<User> {
        this.userData.push(user)
        return user
    }

    async update(user: User): Promise<User | null> {
        const editedUserIndex = this.userData.findIndex(
            (userInBD) => userInBD.id === user.id
        )

        if (editedUserIndex === -1) return null

        this.userData[editedUserIndex] = user

        return user
    }

    async delete(userId: string): Promise<void> {}
}
