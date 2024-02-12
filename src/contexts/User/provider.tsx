'use client'

import { useState } from 'react'

import UserContext from './context'
import { User } from '@/types/models/User'

export default function UserContextProvider ({
  children
}: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined)

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
