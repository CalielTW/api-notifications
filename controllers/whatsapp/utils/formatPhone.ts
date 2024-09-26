/**
 * Cleans a phone number by removing unwanted characters and formatting it
 * to a valid +52 format (Mexico).
 *
 * @param {string} phone - The raw phone number input.
 * @returns {string} - The formatted phone number or an empty string if invalid.
 */
export const formatPhone = (phone: string) => {
    if (!phone) return ''

    let formatted = phone.toString()

    // Remove country codes (+521, +52) and unwanted characters
    formatted = cleanPhone(formatted)

    // Remove Lada (01, 044) or extra leading digits (like 1)
    formatted = cleanLada(formatted)

    // Validate if the result is a valid phone number
    if (!isValidPhone(formatted)) return ''

    return `+52${formatted}`
}

/**
 * Cleans the phone number by removing country codes and unwanted characters.
 *
 * @param {string} phone - The phone number to clean.
 * @returns {string} - The cleaned phone number.
 */
const cleanPhone = (phone: string) => {
    return phone
        .replace(/\+521|\+52/g, '') // Remove +521 and +52
        .replace(/[\s+().-]/g, '') // Remove spaces, dots, parentheses, and hyphens
}

/**
 * Removes Lada codes (01, 044) and leading '1' if present.
 *
 * @param {string} phone - The phone number to process.
 * @returns {string} - The phone number with Lada codes and extra leading digits removed.
 */
const cleanLada = (phone: string) => {
    if (phone.startsWith('01')) {
        phone = phone.substring(2)
    } else if (phone.startsWith('044')) {
        phone = phone.substring(3)
    } else if (phone.length > 10 && phone.startsWith('1')) {
        phone = phone.substring(1)
    }
    return phone
}

/**
 * Validates if the cleaned phone number is a valid 10-digit number.
 *
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
const isValidPhone = (phone: string) => {
    const validate = /^[0-9]+$/
    return validate.test(phone) && phone.length === 10
}
