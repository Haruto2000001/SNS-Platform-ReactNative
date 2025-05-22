import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type LocationFromSupabase = {
  id: number
  longitude: number
  latitude: number
  updated_at: string
}

const getRealtimeLocationFromSupabase = () => {
  const [locations, setLocations] = useState<LocationFromSupabase[]>([])

  useEffect(() => {
    // 初期データ取得
    const initialFetchLocation = async () => {
      const { data, error } = await supabase
        .from("user_settings")
        .select("id, longitude, latitude, updated_at")
      if (error) {
        console.error("Failed to get location:", error)
      } else if (data) {
        setLocations(data)
      }
    }

    initialFetchLocation()

    // リアルタイムサブスクライブ
    const channel = supabase
      .channel("user_settings_updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "user_settings" },
        (payload) => {
          setLocations((prev) => {
            const updated = prev.filter((loc) => loc.id !== payload.new.id)
            return [
              {
                id: payload.new.id,
                longitude: payload.new.longitude,
                latitude: payload.new.latitude,
                updated_at: payload.new.updated_at,
              },
              ...updated,
            ]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { locations }
}

export default getRealtimeLocationFromSupabase
