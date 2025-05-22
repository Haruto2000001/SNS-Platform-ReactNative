import useUserStore from '@/store/userStore'
import { t } from '@lingui/core/macro'
import { StyleSheet, Text, View } from 'react-native'

export default function Home() {
  const user = useUserStore((state) => state.user)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t`Home`}</Text>
      <Text style={styles.subtitle}>{t`Hello ${user?.email || ''}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
  },
})
