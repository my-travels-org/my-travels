
const required = 'Este campo es requerido'
const number = 'Este campo debe ser un número'
const email = 'Este campo debe ser un correo electrónico'
const min = (min = number): string => `Este campo debe ser mayor o igual a ${min}`
const max = (max = number): string => `Este campo debe ser menor o igual a ${max}`
const minString = (min = number): string => `Este campo debe tener al menos ${min} caracteres`
const maxString = (max = number): string => `Este campo debe tener como máximo ${max} caracteres`
const url = 'Este campo debe ser una URL válida'
const positive = 'Este campo debe ser un número positivo'
const negative = 'Este campo debe ser un número negativo'
const integer = 'Este campo debe ser un número entero'
const alphanumeric = 'Este campo debe ser alfanumérico'
const select = 'Debe seleccionar una opción'

export { required, number, email, min, max, minString, maxString, url, positive, negative, integer, alphanumeric, select }
