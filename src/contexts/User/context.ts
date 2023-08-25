'use client'

import { createContext, useContext } from 'react'
import { type UserContextType } from '@/types'

const UserContext = createContext<UserContextType>({
  user: undefined,
  login: () => {},
  logout: () => {}
})

export const useUserContext = (): UserContextType => useContext(UserContext)

export default UserContext
