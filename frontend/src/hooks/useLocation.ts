import useUserStore from '@/store/userStore'
import * as Location from 'expo-location'
import { useCallback, useEffect, useState } from 'react'

const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { setLocation: setUserLocation } = useUserStore()

  const getCurrentLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    try {
      const newLocation = await Location.getCurrentPositionAsync({})
      setLocation(newLocation)
      setUserLocation({
        longitude: newLocation.coords.longitude,
        latitude: newLocation.coords.latitude,
      })
    } catch (e) {
      setErrorMsg('Failed to get location')
    }
  }, [setUserLocation])

  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation])

  const clearLocation = () => {
    setLocation(null)
    setUserLocation(null)
  }

  return { location, errorMsg, clearLocation, getCurrentLocation }
}

export default useLocation
