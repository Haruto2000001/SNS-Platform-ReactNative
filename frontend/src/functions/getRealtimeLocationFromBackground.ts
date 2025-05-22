import BackgroundGeolocation, {
  Location,
  Subscription,
} from "react-native-background-geolocation"
import { useEffect, useState } from "react"

const getRealtimeLocationFromBackGround = (): {
  enabled: boolean
  location: Location | null
  setEnabled: (enabled: boolean) => void
} => {
  const [enabled, setEnabled] = useState<boolean>(false)
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
    const onLocation: Subscription = BackgroundGeolocation.onLocation(
      (location: Location) => {
        setLocation(location)
      }
    )

    const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange(
      (event) => {
        console.log("[onMotionChange]", event)
      }
    )

    const onActivityChange: Subscription =
      BackgroundGeolocation.onActivityChange((event) => {
        console.log("[onActivityChange]", event)
      })

    const onProviderChange: Subscription =
      BackgroundGeolocation.onProviderChange((event) => {
        console.log("[onProviderChange]", event)
      })

    const test = async () => {
      /// 2. ready the plugin.
      BackgroundGeolocation.ready({
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        // Activity Recognition
        stopTimeout: 5,
        // Application config
        debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true, // <-- Auto start tracking when device is powered-up.
      })

      await BackgroundGeolocation.start()
    }

    test()

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove()
      onMotionChange.remove()
      onActivityChange.remove()
      onProviderChange.remove()
    }
  }, [])

  return { enabled, location, setEnabled }
}

export default getRealtimeLocationFromBackGround
