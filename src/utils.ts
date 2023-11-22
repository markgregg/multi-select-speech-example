export const isUnique = (value: string, index: number, array: string[]) => {
  return array.indexOf(value) === index;
}

export const formatDate = (date: Date): string => date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

export const extractDate = (text: string) => {
  const dt = new Date()
  const value = parseInt(text.substring(0, text.length - 1))
  const postFix = text.substring(text.length - 1)
  if (postFix === 'y' || postFix === 'Y') {
    dt.setFullYear(dt.getFullYear() + value)
    return formatDate(dt)
  } else {
    const addYears = (value + dt.getMonth()) / 12
    const months = (value + dt.getMonth()) % 12
    dt.setFullYear(dt.getFullYear() + addYears)
    dt.setMonth(months)
    return formatDate(dt)
  }
}

export const isSize = (text: string): boolean => {
  if (text.length > 1 && !text.includes('.')) {
    const postfix = text.toLowerCase()[text.length - 1]
    if (postfix === 'm' || postfix === 'k') {
      const number = Number(text.substring(0, text.length - 1))
      return !isNaN(Number(number))
    }
    return !isNaN(Number(text))
  }
  return false
}

export const getSize = (text: string): number => {
  const postfix = text.toLowerCase()[text.length - 1]
  if (postfix === 'm' || postfix === 'k') {
    const number = Number(text.substring(0, text.length - 1))
    return Number(number) * (postfix === 'm' ? 1000000 : 1000)
  }
  return Number(text)
}