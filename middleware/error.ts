import { NextFunction, Request, Response } from 'express'

import { ErrorResponse } from '../utils'

import { SERVER_ERROR_CODE } from 'constants/errors'

export const errorHandler = (
    error: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { message, statusCode } = error

        return res
            .status(statusCode)
            .json({ success: false, error: message || SERVER_ERROR_CODE })
    } catch (error) {
        console.error(error)
        if (error instanceof Error)
            return next(new ErrorResponse(error.message, 500))
    }
}
