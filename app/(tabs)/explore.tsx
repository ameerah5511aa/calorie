import { Colors } from '@/constants/theme';
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
    router.push({
      pathname: '/exercise-list',
      params: { calories: calories }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background blobs (same as home) */}
      <View style={styles.bgBlob} />
      <View style={styles.bgLine} />

      {/* Header with avatar (same as home) */}
      <View style={styles.header}>
        <View style={styles.profileAvatar}>
          <Text style={styles.avatarEmoji}>👩‍🦱</Text>
        </View>
      </View>

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgBlob: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 300,
    height: 300,
    backgroundColor: '#EAF8D1',
    borderRadius: 150,
    transform: [{ rotate: '15deg' }],
  },
  bgLine: {
    position: 'absolute',
    top: 20,
    left: -20,
    width: 350,
    height: 180,
    borderTopWidth: 1.5,
    borderTopColor: Colors.light.purple,
    borderRadius: 200,
    transform: [{ rotate: '-12deg' }],
    opacity: 0.5,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 20,
    alignItems: 'flex-end',
    zIndex: 10,
  },
  profileAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFD966',
    borderWidth: 2,
    borderColor: Colors.light.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 30,
  },
  content: { 
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center',
  },
  label: { 
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    color: Colors.light.text,
  },
  input: { 
    width: 180,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  button: { 
    backgroundColor: Colors.light.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: { 
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  warningBox: { 
    backgroundColor: Colors.light.purpleLight,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    borderRadius: 16,
    marginTop: 60,
    padding: 20,
    width: '100%',
  },
  warningTitle: { 
    color: Colors.light.purple,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  warningText: { 
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 18,
  },
});