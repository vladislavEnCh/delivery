import {createContext} from 'react'

function fu() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: fu,
  logout: fu,
  isAuthenticated: false
})
