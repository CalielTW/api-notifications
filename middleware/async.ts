import { ErrorResponse } from '@utils/ErrorResponse'
import { Request, Response, NextFunction } from 'express'

export const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error: Error) => {
            next(new ErrorResponse(error.message, 500))
        })
    }
