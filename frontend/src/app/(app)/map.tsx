import { StyleSheet, View } from 'react-native'
import MapComponent from '@/components/MapComponent'


export default function MapPage() {
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapComponent />
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  map: {
    flex: 1
  }
})

