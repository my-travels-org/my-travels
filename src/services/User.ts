import axios from 'axios'

import { type LoginUserDTO, type CreateUserDTO, User } from '@/types/models/User'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ?? ''

const create = async (user: CreateUserDTO): Promise<User> => {
  return await axios.post(`${baseUrl}/auth/register`, user)
}

const login = async (user: LoginUserDTO): Promise<any> => {
  return await axios.post('http://127.0.0.1:8000/api/auth/login', user)
}

export const userService = {
  create,
  login
}
