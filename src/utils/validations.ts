export const required = (value: string) => {
  return value && value.trim() !== ''
}

export const minLength = (value: string, count = 6) => {
  return value && value.length >= count
}

export const maxLength = (value: string, count = 100) => {
  return value && value.length <= count
}

export const isEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export const isSame = (first: string, second: string) => {
  return first === second
}
