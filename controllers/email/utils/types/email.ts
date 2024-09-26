import { IUser } from 'types'
import { JwtPayload } from 'jsonwebtoken'

export interface IEmailConstructor {
    host: string
    email: string
    hostEmail: string
    user: IUser
    subject: string
    decodedData: JwtPayload
}

export interface IEmailMessage {
    from: string
    to: string
    replyTo: string
    subject: string
    context: JwtPayload
    template: string
}
