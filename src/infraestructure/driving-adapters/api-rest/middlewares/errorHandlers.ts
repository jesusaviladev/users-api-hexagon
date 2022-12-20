import { UserNameAlreadyExistsException } from '../../../../domain/exceptions/UserAlreadyExistsException'
import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'
import { NextFunction, Request, Response } from 'express'

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res.status(404).json({
        error: 'Not found',
    })
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(error)

    if (error instanceof UserNameAlreadyExistsException) {
        return res.status(400).json({
            error: error.message,
        })
    }

    if (error instanceof UserNotFoundException) {
        return res.status(400).json({
            error: error.message,
        })
    }

    return res.status(500).json({
        error: 'Internal server error',
    })
}
