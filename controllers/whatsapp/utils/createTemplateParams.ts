/**
 * Helper function to create parameters array for template placeholders
 * @param {Record<string, string>} params - Object with key-value pairs of placeholders
 * @param {string[]} placeholders - Array of placeholder names
 * @returns {object[]} - Array of parameters for the template
 */
export const createTemplateParams = (
    params: Record<string, string>,
    placeholders: string[]
): object[] => {
    return placeholders
        .map((key) => ({
            type: 'text',
            text: params[key] || '',
        }))
        .filter((param) => param.text !== '')
}
