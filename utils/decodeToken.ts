import { INVALID_TOKEN_ERROR_CODE } from '@constants/errors'
import { ErrorResponse } from '@utils/ErrorResponse'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction } from 'express'

/**
 * Verifies a JWT token and extracts its payload.
 *
 * @param {string} token - The JWT token to verify.
 * @param {NextFunction} next - The next middleware function to call in case of an error.
 * @param {string} [secret=process.env.JWT_SECRET] - The secret used to verify the token.
 * @returns {JwtPayload | void} - The decoded JWT payload or void if an error occurs.
 */
export const decodeToken = (
    token: string,
    next: NextFunction,
    secret: string = process.env.JWT_SECRET!
): JwtPayload | void => {
    try {
        return jwt.verify(token, secret) as JwtPayload
    } catch (error) {
        return next(new ErrorResponse(INVALID_TOKEN_ERROR_CODE, 401))
    }
}
