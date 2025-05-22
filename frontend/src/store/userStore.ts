import storage from "@/lib/storage"
import { supabase } from "@/lib/supabase"
import type { AuthError, User } from "@supabase/supabase-js"
import { create } from "zustand"

type Location = {
  longitude: number
  latitude: number
}

interface UserState {
  user: User | null
  isLoggedIn: boolean
  isLoggingIn: boolean
  locale: string
  location: Location | null
  icon: string
  signIn: (email: string, password: string) => Promise<AuthError | null>
  signOut: () => Promise<AuthError | null>
  setLocale: (locale: string) => Promise<boolean>
  setLocation: (location: Location | null) => Promise<boolean>
  setIcon: (icon: string) => Promise<any>
}

const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoggedIn: false,
  isLoggingIn: false,
  locale: storage.getItem("locale"),
  location: null,
  icon: "",

  signIn: async (email, password) => {
    set({ isLoggingIn: true })
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    set({ isLoggingIn: false })
    return error
  },

  signOut: async () => {
    await storage.removeItem("tk-auth") // force remove auth in storage
    set({ isLoggingIn: true, isLoggedIn: false, user: null }) // force user to null
    const { error } = await supabase.auth.signOut()
    set({ isLoggingIn: false })
    return error
  },

  setLocale: async (locale: string) => {
    set({ locale })
    storage.setItem("locale", locale)
    if (get().isLoggedIn) {
      const user = get().user
      const res = await supabase
        .from("user_settings")
        .upsert({ id: user?.id, locale: locale })
      if (res.error) console.error(res.error)
    }
    return true
  },

  setLocation: async (location: Location | null) => {
    set({ location })
    if (get().isLoggedIn) {
      const user = get().user

      // supabase translates POINT to ST_GeogFromText('SRID=4326;POINT({longitude} {latitude})')
      const locationval =
        location === null
          ? null
          : `POINT(${location.longitude} ${location.latitude})`

      const res = await supabase.from("user_settings").upsert({
        id: user?.id,
        location: locationval,
      })
      if (res.error) console.error(res.error)
    }
    return true
  },

  setIcon: async (icon: string) => {
    set({ icon })
    if (get().isLoggedIn) {
      const user = get().user
      const res = await supabase.from("user_settings").upsert({
        id: user?.id,
        icon: icon,
      })
      if (res.error) console.error(res.error)
    }
    return true
  },
}))

supabase.auth.onAuthStateChange((event, session) => {
  useUserStore.setState({
    isLoggedIn: !!session?.user,
    user: session?.user || null,
  })
})

export default useUserStore
