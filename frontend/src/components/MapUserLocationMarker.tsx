import { ShapeSource, SymbolLayer, CircleLayer, FillLayer, Images } from "@maplibre/maplibre-react-native"
import getRealtimeLocationFromSupabase from "@/functions/getRealtimeLocationFromSupabase"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

interface Icons {
  [id: string]: [icon: string]
}
export default function MapUserLocationMarker() {
  const { locations } = getRealtimeLocationFromSupabase()
  const [icons, setIcons] = useState({})

  useEffect(() => {
    const fetchIcons = async () => {
      const { data, error } = await supabase.from("user_settings").select("id, icon")
      if (error) {
        console.error(error)
      } else {

        const iconstemp: Icons = {}
        data.map((c) => {
          iconstemp[c.id] = c.icon
        })
        setIcons(iconstemp)
      }
    }
    fetchIcons()
  }, [])


  return (
    <>
      <Images images={icons} />
      {locations && locations.map((userlocation) => (
        <ShapeSource
          key={userlocation.id} // keyの追加
          id={`userlocation-${userlocation.id}`}
          shape={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [userlocation.longitude, userlocation.latitude],
                },
                properties: {},
              },
            ],
          }}
        >

          <SymbolLayer
            id={`symbollayer-${userlocation.id}`}
            style={{
              iconImage: `${userlocation.id}`, // ピンの画像
              iconSize: 0.05, // ピンのサイズ
              iconAnchor: "center", // ピンの下部を基準点にする
              iconAllowOverlap: true, // アイコンが重なっても表示
              iconIgnorePlacement: true,
              textAllowOverlap: true,
              textIgnorePlacement: true,
              textAnchor: "top",
              textField: `${userlocation.id}`
            }}
          />

        </ShapeSource>
      ))}
    </>
  )
}