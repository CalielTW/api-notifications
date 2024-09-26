import {
    INVALID_TOKEN_ERROR_CODE,
    MISSIN_TOKEN_ERROR_CODE,
    INVALID_PHONE_ERROR_CODE,
    FAILED_MSG_TEMPLATE_ERROR_CODE,
} from '@constants/errors'
import {
    WHATSAPP_CLIENT,
    WHATSAPP_TEMPLATE,
    WHATSAPP_LANGUAGE_CODE,
} from '@constants/whatsapp'
import { asyncHandler } from '@middleware/async'
import { ErrorResponse } from '@utils/ErrorResponse'
import { NextFunction, Request, Response } from 'express'
import { extractPlaceholders, createTemplateParams, formatPhone } from './utils'
import { decodeToken } from '@utils/decodeToken'
import axios from 'axios'

const WHATSAPP_URL = "https://graph.facebook.com"
const WHATSAPP_VERSION = "v17.0"

/**
 * WhatsApp Notification handler
 * @description Sends a WhatsApp message template using the provided credentials and data
 * @param {Request} req - HTTP Request.
 * @param {Response} res - HTTP Response.
 * @param {NextFunction} next - Function to pass to next middleware.
 * @returns {Promise<void>} - JSON with success or error message.
 */
export const whatsappNotification = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.body
        if (!token) return next(new ErrorResponse(MISSIN_TOKEN_ERROR_CODE, 400))

        const decodedData = decodeToken(token, next)
        if (!decodedData) 
            return next(new ErrorResponse(INVALID_TOKEN_ERROR_CODE, 401))

        const { wspAccount, wspToken } = decodedData
        const { phone, params, templateTitle, template } = req.body

        const formattedPhone = phone.replace('+', '')
        const phoneUser = formatPhone(formattedPhone)
        if (!phoneUser)
            return next(new ErrorResponse(INVALID_PHONE_ERROR_CODE, 401))

        const placeholders = extractPlaceholders(template.message)
        const paramsTemplate = createTemplateParams(params, placeholders)

        // Prepare WhatsApp message data
        const data = {
            messaging_product: WHATSAPP_CLIENT,
            to: formattedPhone,
            type: WHATSAPP_TEMPLATE,
            template: {
                name: templateTitle,
                language: { code: WHATSAPP_LANGUAGE_CODE },
                components:
                    paramsTemplate.length > 0
                        ? [{ type: 'body', parameters: paramsTemplate }]
                        : [],
            },
        }

        // API request config
        const config = {
            headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
            'Content-Type': 'application/json',
        }

        // Send WhatsApp message via API
        const url = `${WHATSAPP_URL}/${WHATSAPP_VERSION}/${wspAccount}/messages?access_token=${wspToken}`
        try {
            await axios.post(url, data, config)
            res.status(200).json({ success: true })
        } catch (error) {
            return next(new ErrorResponse(FAILED_MSG_TEMPLATE_ERROR_CODE, 400))
        }
    }
)
