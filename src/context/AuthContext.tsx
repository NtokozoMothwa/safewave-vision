import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Role = "admin" | "agent" | "responder"

interface User {
  username: string
  role: Role
}

interface AuthContextProps {
  user: User | null
  login: (username: string, role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = (username: string, role: Role) => {
    const user = { username, role }
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
  localStorage.removeItem("user")
  setUser(null)
  window.location.href = "/" // force refresh
}


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
