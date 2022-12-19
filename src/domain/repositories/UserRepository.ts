import { User } from '../entities/User'

export interface UserRepository {
    getAll: () => Promise<User[]>
    getByUsername: (username: string) => Promise<User | null>
    getById: (userId: string) => Promise<User | null>
    save: (user: User) => Promise<User>
    update: (user: User) => Promise<User>
    delete: (userId: string) => Promise<void>
}
