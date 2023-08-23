import axios, { type AxiosResponse } from 'axios'

import { type LoginUserDTO, type CreateUserDTO, User } from '@/types'

const baseUrl = process.env.SERVER_API ?? ''

const create = async (user: CreateUserDTO): Promise<AxiosResponse<User>> => {
  const response = await axios.post('http://localhost:8000/api/auth/register', user)
  return response
}

const login = async (user: LoginUserDTO): Promise<any> => {
  const response = await axios.post(`${baseUrl}/auth/login`, user)
  return response
}

export const userService = {
  create,
  login
}
