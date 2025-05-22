import { View, Text, Image, StyleSheet } from "react-native"
import useUserStore from "@/store/userStore"
import { useEffect } from "react"
import { getUserProfileImageFromSupabase } from "@/functions/getProfileImageFromSupabase"


export default function UserProfileImage() {
  const { user, icon, setIcon } = useUserStore()

  useEffect(() => {
    const fetchIcon = async () => {
      if (user?.id && !icon) {
        const data = await getUserProfileImageFromSupabase(user)
        if (data?.icon) {
          setIcon(data.icon)
        }
      }
    }
    fetchIcon()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user?.id}</Text>
      <Image
        source={{ uri: icon }}
        style={styles.img}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100
  }
})


