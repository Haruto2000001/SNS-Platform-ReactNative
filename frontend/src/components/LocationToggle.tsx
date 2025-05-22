import useLocation from '@/hooks/useLocation'
import { t } from '@lingui/core/macro'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function LocationToggle() {
  const { clearLocation, getCurrentLocation, location } = useLocation()

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.toggleButton, location !== null && styles.activeButton]}
        onPress={() => getCurrentLocation()}
      >
        <Text style={[styles.toggleText, location !== null && styles.activeText]}>
          {t`Location On`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, location === null && styles.activeButton]}
        onPress={() => clearLocation()}
      >
        <Text style={[styles.toggleText, location === null && styles.activeText]}>
          {t`Location Off`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
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
