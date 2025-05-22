import { supabase } from '@/lib/supabase'
import Feather from '@expo/vector-icons/Feather'
import { t } from '@lingui/core/macro'
import { Link } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async () => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'tkaiapp://reset-password',
      })

      if (error) throw error

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : t`An error occurred`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Link href="/signin-email" asChild>
        <Pressable style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </Pressable>
      </Link>

      <View style={styles.content}>
        <Text style={styles.title}>{t`Reset Password`}</Text>
        <Text style={styles.subtitle}>
          {t`Enter your email address and we'll send you instructions to reset your password`}
        </Text>

        {error && <Text style={styles.error}>{error}</Text>}
        {success && (
          <Text style={styles.success}>{t`Check your email for password reset instructions`}</Text>
        )}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder={t`Email`}
              placeholderTextColor="#888888"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
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
              <Text style={styles.buttonText}>{t`Send Reset Instructions`}</Text>
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
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 1,
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
  success: {
    color: '#059669',
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
