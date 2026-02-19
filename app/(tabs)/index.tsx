import { useRouter } from 'expo-router'; // 1. استيراد أداة التنقل
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Page() {
  const router = useRouter(); // 2. تعريف الموجه (router)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        
        {/* شعار التطبيق */}
        <Text style={styles.logoText}>BurnIt</Text>
        <Text style={styles.subtitle}>سجل الآن وابدأ رحلة اللياقة</Text>

        {/* حقول الإدخال */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>البريد الإلكتروني</Text>
          <TextInput 
            style={styles.input} 
            placeholder="example@mail.com" 
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>كلمة المرور</Text>
          <TextInput 
            style={styles.input} 
            placeholder="********" 
            secureTextEntry={true} 
            placeholderTextColor="#999"
          />
        </View>

        {/* زر تسجيل الدخول المعدل مع خاصية الانتقال */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => router.push('/explore')} // 3. عند الضغط ينتقل لصفحة explore
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* نص إضافي */}
        <TouchableOpacity style={{ marginTop: 20 }}>
          <Text style={{ color: '#7149C6', textAlign: 'center' }}>
            لديك حساب بالفعل؟ سجل دخولك
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// التنسيقات (تأكدي أن الأسماء تطابق الأسماء فوق)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
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
    textAlign: 'right', // ليتناسب مع اللغة العربية
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
    shadowColor: '#00D68F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});