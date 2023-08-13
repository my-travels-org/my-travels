export const errors = {
  required: 'Este campo es requerido',
  number: 'Este campo debe ser un número',
  email: 'Este campo debe ser un correo electrónico',
  min: (min: number) => `Este campo debe ser mayor o igual a ${min}`,
  max: (max: number) => `Este campo debe ser menor o igual a ${max}`,
  minString: (min: number) => `Este campo debe tener al menos ${min} caracteres`,
  maxString: (max: number) => `Este campo debe tener como máximo ${max} caracteres`,
  url: 'Este campo debe ser una URL válida',
  positive: 'Este campo debe ser un número positivo',
  negative: 'Este campo debe ser un número negativo',
  integer: 'Este campo debe ser un número entero',
  alphanumeric: 'Este campo debe ser alfanumérico'
}
