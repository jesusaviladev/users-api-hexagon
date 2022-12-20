import { Router } from 'express'
import {
    createUser,
    deleteUser,
    editUser,
    getUsers,
} from '../controllers/users.controller'

const usersRouter = Router()

usersRouter.get('/', getUsers)

usersRouter.post('/', createUser)

usersRouter.patch('/', editUser)

usersRouter.delete('/:userId', deleteUser)

export default usersRouter
