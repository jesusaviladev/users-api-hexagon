export class UserNameAlreadyExistsException extends Error {
    constructor() {
        super('Username already exists')
    }
}
