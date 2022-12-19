import { Router } from 'express'
import { createUser, getUsers } from '../controllers/users.controller'

const usersRouter = Router()

usersRouter.get('/', getUsers)

usersRouter.post('/', createUser)

usersRouter.patch('/', () => {})

usersRouter.delete('/', () => {})

export default usersRouter
