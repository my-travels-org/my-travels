'use client'

import { createContext, useContext } from 'react'

const UserContext = createContext<any>({
  user: undefined,
  login: () => {},
  logout: () => {}
})

export const useUserContext = (): any => useContext(UserContext)

export default UserContext
