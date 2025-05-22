import { supabase } from '@/lib/supabase'
import Feather from '@expo/vector-icons/Feather'
import { t } from '@lingui/core/macro'
import { router } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError(t`Passwords do not match`)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      router.replace('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : t`An error occurred`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t`Set New Password`}</Text>
        <Text style={styles.subtitle}>{t`Enter your new password below`}</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder={t`New Password`}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder={t`Confirm New Password`}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t`Reset Password`}</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 32,
  },
  error: {
    color: '#DC2626',
    marginBottom: 16,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
})
