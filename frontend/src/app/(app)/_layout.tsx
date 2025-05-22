import useUserStore from '@/store/userStore'
import Feather from '@expo/vector-icons/Feather'
import { t } from '@lingui/core/macro'
import { Redirect, Tabs } from 'expo-router'

export default function AppLayout() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return <Redirect href="/" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4F46E5',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t`Home`,
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: t`Groups`,
          tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t`Map`,
          tabBarIcon: ({ color, size }) => <Feather name="map" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t`Profile`,
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
