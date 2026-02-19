import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ExploreScreen() {
  const [calories, setCalories] = useState('');
  const router = useRouter();

  const handleShowExercise = () => {
    if (!calories) {
      alert("الرجاء إدخال عدد السعرات أولاً");
      return;
    }
    // الانتقال للواجهة الثالثة وإرسال قيمة السعرات كـ Parameter
    router.push({
      pathname: '/exercise-list',
      params: { calories: calories }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Enter Calories</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="0" 
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />

        <TouchableOpacity style={styles.button} onPress={handleShowExercise}>
          <Text style={styles.buttonText}>show exercise</Text>
        </TouchableOpacity>

        {/* نصيحة طبية كما في تصميمك */}
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>⚠️ Health Warning</Text>
          <Text style={styles.warningText}>Consult your doctor before starting any training program.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 25 },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  input: { 
    width: '80%', 
    height: 50, 
    backgroundColor: '#FFF', 
    borderRadius: 10, 
    textAlign: 'center', 
    fontSize: 20, 
    borderWidth: 1, 
    borderColor: '#DDD',
    marginBottom: 30 
  },
  button: { 
    backgroundColor: '#00D68F', 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 10 
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  warningBox: { 
    marginTop: 100, 
    backgroundColor: '#F0EFFF', 
    padding: 20, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#E0DBFF' 
  },
  warningTitle: { color: '#7149C6', fontWeight: 'bold', marginBottom: 5 },
  warningText: { color: '#666', textAlign: 'center' }
});