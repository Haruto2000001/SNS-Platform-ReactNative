import useUserStore from '@/store/userStore'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const LocaleToggle = () => {
  const locale = useUserStore((state) => state.locale)
  const setLocale = useUserStore((state) => state.setLocale)

  const handleLocaleChange = (newLocale: 'en-US' | 'ja-JP') => {
    setLocale(newLocale)
  }

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, locale === 'en-US' && styles.activeButton]}
          onPress={() => handleLocaleChange('en-US')}
        >
          <Text style={[styles.toggleText, locale === 'en-US' && styles.activeText]}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, locale === 'ja-JP' && styles.activeButton]}
          onPress={() => handleLocaleChange('ja-JP')}
        >
          <Text style={[styles.toggleText, locale === 'ja-JP' && styles.activeText]}>日本語</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#2563EB',
    elevation: 2,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeText: {
    color: '#FFFFFF',
  },
})

export default LocaleToggle
