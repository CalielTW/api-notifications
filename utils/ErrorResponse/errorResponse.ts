import { removeProviders } from './utils'

export class ErrorResponse extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        message = message.toLowerCase()

        message = removeProviders(message)

        super(message)

        this.statusCode = statusCode
    }
}
