export interface Validation {
  rule: (val: string) => boolean
  errorMessage: string
}

export interface Input {
  type: string
  placeholder: string
  field: string
  value: string
  validations: Validation[]
}

export type Form<T extends Input[]> = {
  [K in T[number]['field']]: string
}
