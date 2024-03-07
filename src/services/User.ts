import axios from 'axios'

import { type CreateUserDTO, User, updateUser } from '@/types/models/User'

const baseUrl = process.env.NEXTAUTH_URL ?? ''

const create = async (user: CreateUserDTO): Promise<User> => {
  return await axios.post('/api/auth/signup', user)
}

const update = async (user: updateUser): Promise<any> => {
  return await axios.post(`${baseUrl}/auth/register`, user)
}

export const userService = {
  create,
  update
}
