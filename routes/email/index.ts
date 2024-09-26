import { EMAIL_NOTIFICATION_ROUTE } from '@constants/email'
import { Router } from 'express'
import { emailNotification } from '@controllers/email'

const router = Router({ mergeParams: true })

/**
 * Route to handle email notifications
 *
 * @public
 * @description - Route to send email notification
 *
 * @route POST /email
 * @see {@link emailNotification} - Calls the emailNotification controller to handle email notifications
 */
router.route(EMAIL_NOTIFICATION_ROUTE).post(emailNotification)

export const emailRoutes = router
