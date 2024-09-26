import {
    EMAIL_HANDLEBARS_PATH,
    EMAIL_HANDLEBARS_EXTENSION,
} from '@constants/email'
import { createTransport, Transporter } from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

/**
 * Sets up the email transporter with the given credentials.
 *
 * @param {string} host - SMTP host.
 * @param {number} port - SMTP port.
 * @param {string} hostEmail - Email address used for sending.
 * @param {string} password - Password for authentication.
 * @returns {Transporter} - Configured email transporter.
 */
export const setupTransporter = (
    host: string,
    port: number,
    hostEmail: string,
    password: string
): Transporter => {
    const viewPath = path.resolve(EMAIL_HANDLEBARS_PATH)
    const transporter: Transporter = createTransport({
        host,
        port,
        auth: { user: hostEmail, pass: password },
    })

    transporter.use(
        'compile',
        hbs({
            viewEngine: {
                extname: EMAIL_HANDLEBARS_EXTENSION,
                partialsDir: path.resolve(EMAIL_HANDLEBARS_PATH),
                layoutsDir: viewPath,
                defaultLayout: '',
            },
            viewPath,
            extName: EMAIL_HANDLEBARS_EXTENSION,
        })
    )

    return transporter
}
