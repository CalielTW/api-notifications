import { PROVIDERS_ARRAY } from '@constants/providers'

/**
 *
 * Will replace Providers' Names with Warbox Providers' Codes
 *
 * @param {string} message Error message
 */
export const removeProviders = (message: string): string => {
    let response = message

    PROVIDERS_ARRAY.map(
        (provider) =>
            (response = response.replace(provider.name, provider.code))
    )

    return response
}
