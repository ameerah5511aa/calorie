import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import axios from 'axios';

export default function Page() {
  const router = useRouter();

  // 1. تعريف حالات الإدخال
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. دالة التسجيل والربط مع السيرفر
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("تنبيه", "الرجاء إدخال كافة البيانات");
      return;
    }

    try {
      // ملاحظة: تأكدي أن السيرفر يعمل على هذا الـ IP
      const response = await axios.post('http://192.168.8.145:5000/api/users/signup', {
        name: email, 
        password: password
      });

      if (response.status === 201) {
        Alert.alert("نجاح", "تم تسجيل حسابك وحفظه في MongoDB ✅");
        router.push('/explore'); 
      }
    } catch (error) {
      console.error(error);
      Alert.alert("خطأ", "فشل الاتصال بالسيرفر. تأكدي أن السيرفر يعمل");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* حل مشكلة غطاء لوحة المفاتيح */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
            
            <View style={styles.main}>
              <Text style={styles.logoText}>BurnIt</Text>
              <Text style={styles.subtitle}>سجل الآن وابدأ رحلة اللياقة</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>البريد الإلكتروني</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="example@mail.com" 
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

                <Text style={styles.label}>كلمة المرور</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="********" 
                  secureTextEntry={true} 
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity 
                style={styles.loginButton} 
                onPress={handleSignUp}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 20 }}>
                <Text style={{ color: '#7149C6', textAlign: 'center' }}>
                  لديك حساب بالفعل؟ سجل دخولك
                </Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  main: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#7149C6',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#00D68F',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#00D68F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});