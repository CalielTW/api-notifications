import {
    MISSIN_TOKEN_ERROR_CODE,
    INVALID_TOKEN_ERROR_CODE,
    FAILED_EMAIL_ERROR_CODE,
} from '@constants/errors'
import { asyncHandler } from '@middleware/async'
import { ErrorResponse } from '@utils/ErrorResponse'
import { NextFunction, Request, Response } from 'express'
import { setupTransporter, buildEmailMessage } from './utils'
import { decodeToken } from '@utils/decodeToken'

/**
 * Sends an email notification with the given credentials and template.
 *
 * @private
 * @description
 *
 * @param {Request} req - HTTP Request.
 * @param {Response} res - HTTP Response.
 * @param {NextFunction} next - Function to pass to next middleware.
 * @returns {Promise<void>} - JSON with success or error message.
 */
export const emailNotification = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.body
        if (!token) return next(new ErrorResponse(MISSIN_TOKEN_ERROR_CODE, 400))

        const decodedData = decodeToken(token, next)
        if (!decodedData) return

        const { host, port, email, hostEmail, password } = decodedData
        const { user, subject } = req.body

        const transporter = setupTransporter(host, port, hostEmail, password)
        if (!transporter)
            return next(new ErrorResponse(INVALID_TOKEN_ERROR_CODE, 401))

        const message = buildEmailMessage({
            host,
            email,
            hostEmail,
            user: user,
            subject,
            decodedData,
        })

        try {
            await transporter.sendMail(message)
            res.status(200).json({
                success: true,
            })
        } catch (error) {
            return next(new ErrorResponse(FAILED_EMAIL_ERROR_CODE, 400))
        }
    }
)
