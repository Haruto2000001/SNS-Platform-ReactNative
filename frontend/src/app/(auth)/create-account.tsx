import { supabase } from '@/lib/supabase'
import Feather from '@expo/vector-icons/Feather'
import { t } from '@lingui/core/macro'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async () => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      })

      if (error) throw error

      router.replace('/home')
    } catch (err) {
      setError(err instanceof Error ? err.message : t`An error occurred`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </Pressable>
      </Link>

      <View style={styles.content}>
        <Text style={styles.title}>{t`Create Account`}</Text>
        <Text style={styles.subtitle}>{t`Sign up to get started`}</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder={t`Username`}
              placeholderTextColor="#888888"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

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

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder={t`Password`}
              placeholderTextColor="#888888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t`Create Account`}</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t`Already have an account?`}</Text>
          <Link href="/" style={styles.footerLink}>
            {t`Sign in`}
          </Link>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    gap: 8,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 16,
  },
  footerLink: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
})
