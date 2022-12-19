import { NextFunction, Request, Response, Router } from 'express'
import usersRouter from './users.routes'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('OK!')
})

router.use('/api/users', usersRouter)

router.use((req, res, next) => {
    return res.status(404).json({
        error: 'Not found',
    })
})

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    return res.status(500).json({
        error: 'Internal server error',
    })
})

export default router
