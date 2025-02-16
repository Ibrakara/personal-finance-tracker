export const capitalizeFirstLetter = (value: string | unknown) => {
  if (typeof value === 'string') {
    return value ? value[0].toUpperCase() + value.substring(1)?.toLowerCase() : ''
  }
}
export const formatDate = (date: Date | string): string => {
  const dateString = new Date(date)
  if (isNaN(dateString.getTime())) {
    throw new Error('Invalid date format')
  }

  const day = String(dateString.getDate()).padStart(2, '0')
  const month = String(dateString.getMonth() + 1).padStart(2, '0')
  const year = dateString.getFullYear()

  return `${day}-${month}-${year}`
}
