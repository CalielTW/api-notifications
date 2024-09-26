import { TProvider } from './types'

export const TWILIO_PROVIDER: TProvider = {
    name: 'twilio',
    code: 'TWL_PVD',
}

export const WHATSAPP_PROVIDER: TProvider = {
    name: 'whatsapp',
    code: 'WSP_PVD',
}

export const PROVIDERS_ARRAY: TProvider[] = [TWILIO_PROVIDER, WHATSAPP_PROVIDER]
