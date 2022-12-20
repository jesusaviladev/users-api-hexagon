import { Router } from 'express'
import { errorHandler, notFoundHandler } from '../middlewares/errorHandlers'
import usersRouter from './users.routes'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('OK!')
})

router.use('/api/users', usersRouter)

router.use(notFoundHandler)

router.use(errorHandler)

export default router
