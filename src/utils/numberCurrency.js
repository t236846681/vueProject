export const numberCurrency = (num, fixed = 2) => {
    if (typeof num === 'string') {
        num = Number(num)
        if (isNaN(num)) {
            num = 0
        }
    }
    if (typeof num !== 'number') {
        num = 0
    }
    let isNegative = false
    if (num < 0) {
        isNegative = true
        num = Math.abs(num)
    }

    let str
    if (typeof fixed === 'number') {
        str = num.toFixed(fixed)
    } else {
        str = num.toString()
    }

    const parts = str.split('.')
    const intPart = parts[0]
    const intArr = []
    const start = intPart.length % 3 === 0 ? 3 : intPart.length % 3
    for (let i = start, j = 0; i <= intPart.length; j = i, i += 3) {
        intArr.push(intPart.slice(j, i))
    }
    parts[0] = intArr.join(',')

    if (isNegative) {
        parts[0] = '-' + parts[0]
    }

    return parts.join('.')
}
