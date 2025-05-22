import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const storage =
  Platform.OS === 'web'
    ? {
        getItem: (key: string, defaultValue = ''): string => {
          try {
            return window.localStorage.getItem(key) ?? defaultValue
          } catch (e) {
            return defaultValue
          }
        },
        setItem: (key: string, value: string): void => {
          try {
            window.localStorage.setItem(key, value)
          } catch (e) {
            // Handle error silently
          }
        },
        removeItem: async (key: string): Promise<void> => {
          try {
            window.localStorage.removeItem(key)
          } catch (e) {
            // Handle error silently
          }
        },
      }
    : {
        getItem: (key: string, defaultValue = ''): string => {
          try {
            return SecureStore.getItem(key) ?? defaultValue
          } catch (e) {
            return defaultValue
          }
        },
        setItem: (key: string, value: string): void => {
          try {
            SecureStore.setItem(key, value)
          } catch (e) {
            // Handle error silently
          }
        },
        removeItem: async (key: string): Promise<void> => {
          try {
            await SecureStore.deleteItemAsync(key)
          } catch (e) {
            // Handle error silently
          }
        },
      }

export default storage
