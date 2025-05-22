import { ThemeProvider } from '@/context/theme'
import { activateLanguage, i18n } from '@/lib/i18n'
import useUserStore from '@/store/userStore'
import { I18nProvider } from '@lingui/react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'

export default function RootLayout() {
  const locale = useUserStore((state) => state.locale) || 'en-US'
  const [currentLocale, setCurrentLocale] = useState<string>(locale)

  useEffect(() => {
    activateLanguage(locale)
    setCurrentLocale(locale)
  }, [locale])

  return (
    <I18nProvider i18n={i18n} key={currentLocale}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </I18nProvider>
  )
}
