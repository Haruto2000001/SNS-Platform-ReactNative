import { type ReactNode, createContext, useContext, useMemo } from 'react'

type ThemeContextType = {
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
})

export const ThemeProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const value = useMemo(() => ({ isDark: false }), [])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
