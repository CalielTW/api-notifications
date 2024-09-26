export const capitalizeNames = (string: string) => {
    if (string === undefined) return ''

    const words = string.split(' ')
    let finalString = ''

    words.map((word, i) => {
        if (i !== 0 && i !== words.length) {
            finalString += ' '
        }
        if (word.includes('.') || word.includes('/')) {
            finalString += word.toUpperCase()
        } else {
            finalString +=
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }
    })

    finalString = finalString.trim()
    return finalString
}
