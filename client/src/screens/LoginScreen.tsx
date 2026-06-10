import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme, spacing, radius, typography } from '../styles/theme';

const LoginScreen = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/home');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.card, {
        backgroundColor: theme.surface,
        shadowColor: theme.shadow.color,
        shadowOpacity: theme.shadow.opacity,
        shadowRadius: theme.shadow.radius,
        shadowOffset: theme.shadow.offset,
        elevation: theme.shadow.elevation,
      }]}>
        <Text style={[typography.h1, styles.title, { color: theme.accent }]}>
          QEye
        </Text>
        <Text style={[typography.body, styles.subtitle, { color: theme.text.secondary }]}>
          Inicia sesión en tu cuenta
        </Text>

        <TextInput
          style={[styles.input, {
            borderColor: theme.border,
            backgroundColor: theme.background,
            color: theme.text.primary,
          }]}
          placeholder="Correo electrónico"
          placeholderTextColor={theme.text.disabled}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, {
            borderColor: theme.border,
            backgroundColor: theme.background,
            color: theme.text.primary,
          }]}
          placeholder="Contraseña"
          placeholderTextColor={theme.text.disabled}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: theme.accent }]}
          onPress={handleLogin}
        >
          <Text style={[typography.body, { color: theme.text.onPrimary, fontWeight: '700' }]}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={[typography.small, styles.link, { color: theme.text.secondary }]}>
            ¿No tienes cuenta?{' '}
            <Text style={{ color: theme.primary, fontWeight: '700' }}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg + spacing.sm, // 28
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md - 2, // 14
    fontSize: 15,
    marginBottom: spacing.sm + spacing.xs + 2, // 14
  },
  btn: {
    borderRadius: radius.md,
    padding: spacing.md - 1, // 15
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  link: {
    textAlign: 'center',
  },
});

export default LoginScreen;