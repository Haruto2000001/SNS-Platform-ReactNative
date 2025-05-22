import LocaleToggle from '@/components/LocaleToggle'
import Fontawesome from '@expo/vector-icons/FontAwesome6'
import { t } from '@lingui/core/macro'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function Welcome() {
  return (
    <LinearGradient
      colors={['#4F46E5', '#7C3AED']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{t`terakoya.ai`}</Text>

        <View style={styles.buttonContainer}>
          <Link href="/signin-email" asChild>
            <Pressable style={styles.button}>
              <Fontawesome name="envelope" size={24} color="#4F46E5" />
              <Text style={styles.buttonText}>{t`Sign in with Email`}</Text>
            </Pressable>
          </Link>
          <Pressable
            style={styles.button}
            onPress={() => alert(t`This feature is not yet implemented`)}
          >
            <Fontawesome name="apple" size={24} color="#4F46E5" />
            <Text style={styles.buttonText}>{t`Sign in with Apple`}</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => alert(t`This feature is not yet implemented`)}
          >
            <Fontawesome name="google" size={24} color="#4F46E5" />
            <Text style={styles.buttonText}>{t`Sign in with Google`}</Text>
          </Pressable>

          <Link href="/create-account" asChild>
            <Pressable style={styles.secondaryButton}>
              <Fontawesome name="user-plus" size={24} color="#fff" />
              <Text style={styles.secondaryButtonText}>{t`Create Account`}</Text>
            </Pressable>
          </Link>

          <LocaleToggle />
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
  },
})
