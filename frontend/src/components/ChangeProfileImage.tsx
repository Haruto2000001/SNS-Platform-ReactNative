import sendProfileImageToSupabase from '@/functions/sendProfileImageToSupabase'
import useUserStore from '@/store/userStore'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useEffect } from 'react'

export default function ChangeProfileImage() {
  const { user } = useUserStore()

  useEffect(() => {
    console.log('Render!')
  }, [])
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { sendProfileImageToSupabase(user) }}>
        <Text style={styles.text}>Change Profile Image</Text>
      </TouchableOpacity >
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'red',
    marginBottom: 'auto',
    padding: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }

})