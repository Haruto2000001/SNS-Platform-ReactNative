import LocaleToggle from '@/components/LocaleToggle'
import LocationToggle from '@/components/LocationToggle'
import ChangeProfileImage from '@/components/ChangeProfileImage'
import UserProfileImage from '@/components/UserProfileImage'
import useUserStore from '@/store/userStore'
import { t } from '@lingui/core/macro'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {
  const { signOut } = useUserStore()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <LocaleToggle />

      <LocationToggle />

      <UserProfileImage />
      <ChangeProfileImage />


      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>{t`Sign Out`}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})
