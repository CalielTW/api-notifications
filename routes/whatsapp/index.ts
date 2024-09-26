import { WHATSAPP_NOTIFICATION_ROUTE } from '@constants/whatsapp'
import { Router } from 'express'
import { whatsappNotification } from '@controllers/whatsapp'

const router = Router({ mergeParams: true })

/**
 * Route to handle whatsapp notifications
 *
 * @public
 * @description - Route to send whatsapp notification
 *
 * @route POST /whatsapp
 * @see {@link whatsappNotification} - Calls the whatsappNotification controller to handle whatsapp notifications
 */
router.route(WHATSAPP_NOTIFICATION_ROUTE).post(whatsappNotification)

export const whatsappRoutes = router
