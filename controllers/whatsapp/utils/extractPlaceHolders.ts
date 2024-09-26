/**
 * Helper function to extract placeholders from the template
 * @param {string} templateMessage - The message template containing placeholders
 * @returns {string[]} - Array of placeholders
 */
export const extractPlaceholders = (templateMessage: string): string[] => {
    const pattern = /{{(.*?)}}/g
    const placeholdersMatch = templateMessage.match(pattern)
    return placeholdersMatch
        ? placeholdersMatch.map((match) => match.slice(2, -2))
        : []
}
