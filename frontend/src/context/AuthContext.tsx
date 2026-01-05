import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

interface User {
  id: string
  name: string
  role: 'admin' | 'reviewer'
}

interface AuthContextType {
  user: User | null
  apiKey: string | null
  login: (apiKey: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('apiKey'))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (apiKey) {
      axios.defaults.headers.common['x-api-key'] = apiKey
      fetchUser()
    } else {
      setIsLoading(false)
    }
  }, [apiKey])

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/me')
      setUser(response.data)
    } catch (error) {
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (key: string) => {
    axios.defaults.headers.common['x-api-key'] = key
    const response = await axios.get('/api/auth/me')
    setUser(response.data)
    setApiKey(key)
    localStorage.setItem('apiKey', key)
  }

  const logout = () => {
    setUser(null)
    setApiKey(null)
    localStorage.removeItem('apiKey')
    delete axios.defaults.headers.common['x-api-key']
  }

  const value = {
    user,
    apiKey,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}