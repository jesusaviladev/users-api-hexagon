import { Router } from 'express'
import { createUser, editUser, getUsers } from '../controllers/users.controller'

const usersRouter = Router()

usersRouter.get('/', getUsers)

usersRouter.post('/', createUser)

usersRouter.patch('/', editUser)

usersRouter.delete('/', () => {})

export default usersRouter
