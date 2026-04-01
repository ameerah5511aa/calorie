import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      await signIn(name, password);
    } catch (err: any) {
      Alert.alert('Login Failed', err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Decorative top elements */}
      <View style={styles.topDecoration} />
      <View style={styles.topLine} />

      {/* Header icons */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Text style={styles.iconText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={styles.iconText}>🌐</Text>
        </TouchableOpacity>
      </View>

      {/* Form container */}
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username<span style={styles.asterisk}>*</span></Text>
          <TextInput
            style={styles.inputField}
            value={name}
            onChangeText={setName}
            placeholder=" "
            placeholderTextColor="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.fieldIcon}>👤</Text>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password<span style={styles.asterisk}>*</span></Text>
          <TextInput
            style={styles.inputField}
            value={password}
            onChangeText={setPassword}
            placeholder=" "
            placeholderTextColor="transparent"
            secureTextEntry
          />
          <Text style={styles.fieldIcon}>👁️</Text>
        </View>

        <TouchableOpacity
          style={[styles.loginBtn, loading && styles.disabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginBtnText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </View>

      {/* Bottom waves */}
      <View style={styles.bottomWaves}>
        <Svg height="100" width="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
          <Path
            d="M0,100 C150,200 350,0 500,100 L500,200 L0,200 Z"
            fill="#C084FC"
            opacity="0.6"
          />
          <Path
            d="M0,150 C200,50 400,250 500,150 L500,200 L0,200 Z"
            fill="#A855F7"
          />
        </Svg>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topDecoration: {
    position: 'absolute',
    top: -30,
    left: -30,
    width: 280,
    height: 280,
    backgroundColor: '#E6F4D7',
    borderRadius: 100,
    transform: [{ rotate: '15deg' }],
    zIndex: 1,
  },
  topLine: {
    position: 'absolute',
    top: 10,
    left: -20,
    width: 320,
    height: 160,
    borderTopWidth: 2,
    borderTopColor: Colors.light.purple,
    borderRadius: 200,
    transform: [{ rotate: '-15deg' }],
    opacity: 0.6,
    zIndex: 2,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 10,
  },
  iconBtn: {
    padding: 8,
  },
  iconText: {
    fontSize: 22,
    color: '#444',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
    justifyContent: 'flex-start',
    zIndex: 10,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    marginBottom: 28,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: 13,
    color: '#64748b',
    zIndex: 11,
  },
  asterisk: {
    color: '#ef4444',
    marginLeft: 2,
  },
  inputField: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 15,
    paddingRight: 45,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    fontSize: 15,
    color: Colors.light.text,
    backgroundColor: '#fff',
  },
  fieldIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -9 }],
    fontSize: 18,
    color: '#94a3b8',
  },
  loginBtn: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: Colors.light.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  spacer: {
    flex: 1,
  },
  bottomWaves: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});