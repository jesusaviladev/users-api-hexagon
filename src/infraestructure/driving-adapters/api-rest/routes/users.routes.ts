import { Router } from 'express'
import { createUser } from '../controllers/users.controller'

const usersRouter = Router()

usersRouter.get('/', () => {})

usersRouter.post('/', createUser)

usersRouter.patch('/', () => {})

usersRouter.delete('/', () => {})

export default usersRouter
