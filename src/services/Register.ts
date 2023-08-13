import axios from 'axios'

import { type CreateUserDTO } from '@/types'

const addUser = async (user: CreateUserDTO): Promise<any> => {
  const response = await axios.post('http://localhost:8000/api/auth/register', user)
  return response
}

export const RegisterService = {
  addUser
}
