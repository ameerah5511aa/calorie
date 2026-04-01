import { useAuth } from '@/context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('select');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!name || !password) {
      Alert.alert('Error', 'Name and password are required');
      return;
    }
    try {
      setLoading(true);
      await signUp(name, password);
    } catch (err: any) {
      Alert.alert('Signup Failed', err.response?.data?.message || 'Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background patterns */}
      <View style={styles.bgPattern}>
        <View style={styles.topLimeBg} />
        <View style={styles.bottomPurpleBg} />
      </View>

      {/* Main content */}
      <View style={styles.appScreen}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
            <Text style={styles.backIconText}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.globalIcon}>
            <Text style={styles.globalIconText}>🌐</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.inputField}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Birthday</Text>
              <TextInput
                style={styles.inputField}
                value={birthday}
                onChangeText={setBirthday}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#999"
              />
              <Text style={styles.fieldIcon}>📅</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="select" value="select" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Weight</Text>
                <TextInput
                  style={styles.inputField}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="kg"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Height</Text>
                <TextInput
                  style={styles.inputField}
                  value={height}
                  onChangeText={setHeight}
                  placeholder="cm"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.inputField, styles.withIcon]}
                value={email}
                onChangeText={setEmail}
                placeholder="name@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.fieldIcon}>✉️</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={[styles.inputField, styles.withIcon]}
                value={password}
                onChangeText={setPassword}
                placeholder="Required"
                secureTextEntry
              />
              <Text style={styles.fieldIcon}>👁️</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.btnSignup, loading && styles.disabled]}
                onPress={handleSignup}
                disabled={loading}
              >
                <Text style={styles.btnSignupText}>
                  {loading ? 'signing up...' : 'sign up'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topLimeBg: {
    position: 'absolute',
    width: '130%',
    height: 250,
    backgroundColor: '#E8F5C8',
    borderRadius: 100,
    top: -120,
    left: '-15%',
    transform: [{ rotate: '-5deg' }],
  },
  bottomPurpleBg: {
    position: 'absolute',
    width: '140%',
    height: 300,
    backgroundColor: '#8813C1',
    borderRadius: 100,
    bottom: -200,
    left: '-20%',
    transform: [{ rotate: '-10deg' }],
  },
  appScreen: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20,
    zIndex: 5,
  },
  navBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    padding: 8,
  },
  backIconText: {
    fontSize: 24,
    color: '#555',
  },
  globalIcon: {
    padding: 8,
  },
  globalIconText: {
    fontSize: 20,
    color: '#777',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 12,
    position: 'relative',
  },
  inputLabel: {
    fontSize: 13,
    color: '#a0a0a0',
    marginBottom: 5,
    fontWeight: '600',
  },
  inputField: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  withIcon: {
    paddingRight: 45,
  },
  fieldIcon: {
    position: 'absolute',
    right: 15,
    top: 42,
    fontSize: 18,
    color: '#bbb',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 15,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#666',
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  btnSignup: {
    backgroundColor: '#14C873',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  btnSignupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'lowercase',
  },
  disabled: {
    opacity: 0.5,
  },
});