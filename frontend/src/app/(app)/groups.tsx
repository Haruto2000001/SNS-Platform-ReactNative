import { t } from '@lingui/core/macro'
import { StyleSheet, Text, View } from 'react-native'

export default function Groups() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t`Groups`}</Text>
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
})
