import { IEmailConstructor, IEmailMessage } from './types'

/**
 * Builds the email message object with the appropriate data.
 *
 * @param {IEmailConstructor} options - Object containing the host, email, hostEmail, user, subject, and decodedData.
 * @returns {IEmailMessage} - The email message object.
 */
export const buildEmailMessage = ({
    host,
    email,
    hostEmail,
    user,
    subject,
    decodedData,
}: IEmailConstructor) => {
    const rename = `${host}. <${hostEmail}>`

    return {
        from: rename,
        to: email,
        replyTo: user.email || '',
        subject,
        context: {
            ...decodedData,
            user,
        },
        template: host,
    }
}
