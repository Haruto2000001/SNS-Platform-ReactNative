import getRealtimeLocationFromBackground from "./getRealtimeLocationFromBackground"
import { supabase } from '@/lib/supabase'
import useUserStore from '@/store/userStore'
import { useEffect } from 'react'

const sendLocationToSupabase = () => {
  const { location } = getRealtimeLocationFromBackground()
  const { user  } = useUserStore()

  //console.log(location)

  useEffect(() => {
    if(user && location && location.coords){
      const locationval = location === null ? null : `POINT(${location.coords.longitude} ${location.coords.latitude})`
      const sendData = async() => {
        const res = await supabase
        .from('user_settings')
        .upsert({
          id: user?.id,
          location: locationval
        })
        if (res.error) console.error(res.error)
      }
    sendData()
     
    }

  }, [location])
}

export default sendLocationToSupabase