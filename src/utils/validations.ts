export const required = (value: string): boolean => {
  return !!value && value.trim() !== ''
}

export const minLength = (value: string, count = 6): boolean => {
  return !!value && value.length >= count
}

export const maxLength = (value: string, count = 100): boolean => {
  return !!value && value.length <= count
}

export const isEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export const isSame = (first: string, second: string): boolean => {
  console.log(first)
  console.log('pas', second);
  

  return first === second
}
