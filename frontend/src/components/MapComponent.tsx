import { StyleSheet } from 'react-native'
import { MapView, Camera, CameraRef } from "@maplibre/maplibre-react-native"
import { MAPTILER_API_KEY } from '@/core/config'
import { MAPTILER_STYLE_URL } from "@/core/constants"
import { useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import useLocation from '@/hooks/useLocation'
import MapUserLocationMarker from './MapUserLocationMarker'
import sendLocationToSupabase from '@/functions/sendLocationToSupabase'
import { supabase } from '@/lib/supabase'
import useUserStore from '@/store/userStore'
import Entypo from '@expo/vector-icons/Entypo'


export default function MapComponent() {
  const { location: initialLocation } = useLocation()
  const { user } = useUserStore()
  const cameraRef = useRef<CameraRef>(null)
  sendLocationToSupabase()

  const moveCurrentPos = async () => {
    const { data, error } = await supabase.from("user_settings").select("longitude, latitude").eq("id", user?.id).single()
    cameraRef.current?.setCamera({})
    cameraRef.current?.setCamera({
      centerCoordinate: [data?.longitude, data?.latitude],
      zoomLevel: 16,
      animationDuration: 1000, // It doesn't work
      animationMode: "flyTo"
    })
  }

  return (
    <MapView
      style={styles.map}
      mapStyle={MAPTILER_STYLE_URL.replace("MAPTILER_API_KEY", MAPTILER_API_KEY)}
    >
      {initialLocation && (
        <Camera
          defaultSettings={{
            centerCoordinate: [initialLocation.coords.longitude, initialLocation.coords.latitude],
            zoomLevel: 14,
          }}
          ref={cameraRef}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={moveCurrentPos}>
        <Entypo name="direction" size={24} color="black" />
      </TouchableOpacity>
      <MapUserLocationMarker />
    </MapView>

  )
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  button: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
  }
})