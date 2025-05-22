import useUserStore from '@/store/userStore'
import { Redirect, Stack } from 'expo-router'

export default function AuthLayout() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)

  if (isLoggedIn) {
    return <Redirect href="/home" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signin-email" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />
    </Stack>
  )
}
