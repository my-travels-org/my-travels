import axios from 'axios'

import { type CreateUserDTO, type User } from '@/types/models/User'

// const baseUrl = process.env.NEXTAUTH_URL ?? ''

const create = async (user: CreateUserDTO): Promise<User> => {
  return await axios.post('/api/auth/signup', user)
}

export const userService = {
  create
}
