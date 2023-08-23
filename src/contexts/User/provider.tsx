'use client'

import { useState } from 'react'

import UserContext from './context'
import {
  type User,
  type UserContextProviderProps,
  type AppState
} from '@/types'

export default function UserContextProvider ({
  children
}: UserContextProviderProps): JSX.Element {
  const [user, setUser] = useState<AppState['user']>(undefined)

  const login = (user: User): void => {
    setUser(user)
  }

  const logout = (): void => {
    setUser(undefined)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
