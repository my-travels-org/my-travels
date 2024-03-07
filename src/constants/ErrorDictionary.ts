export const registerErrors: {
  [key: string]: string
} = {
  correo: 'El correo electrónico ya se encuentra registrado.'
}

export const httpErrors = {
  400: 'Petición incorrecta',
  401: 'Credenciales inválidas',
  403: 'Prohibido',
  404: 'No encontrado',
  500: 'Error interno del servidor'
}
