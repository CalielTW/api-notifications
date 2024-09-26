import {
    PROJECT_NAME,
    ELLYONSOFT_NAME,
    ELLYONSOFT_PHONE,
    ELLYONSOFT_WEBSITE,
    WHATSAPP_API_ROUTE,
    EMAIL_API_ROUTE,
} from '@constants/index'
import 'dotenv/config'
import express, { Request, Response } from 'express'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import { errorHandler } from '@middleware/index'
import httpContext from 'express-http-context'
import { emailRoutes, whatsappRoutes } from '@routes/index'

colors

const app = express()

app.use(httpContext.middleware)

app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: '30mb' }))
app.use(cors())
app.use(morgan('dev'))

app.use(EMAIL_API_ROUTE, emailRoutes)
app.use(WHATSAPP_API_ROUTE, whatsappRoutes)

app.get('/', (req: Request, res: Response) => {
    res.json({
        company: ELLYONSOFT_NAME,
        phone: ELLYONSOFT_PHONE,
        website: ELLYONSOFT_WEBSITE,
        project: PROJECT_NAME,
    })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`.magenta)
)

process.on('unhandledRejection', (err: Error) => {
    console.log(`Error: ${err.message}`.yellow)
    server.close(() => process.exit(1))
})
