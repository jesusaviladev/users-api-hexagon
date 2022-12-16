import { NextFunction, Request, Response, Router } from 'express'

const router = Router()

router.use('/', (req, res) => {
    return res.status(200).send('OK!')
})

router.use((req, res, next) => {
    return res.status(404).json({
        error: 'Not found',
    })
})

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        error: 'Interal server error',
    })
})

export default router
