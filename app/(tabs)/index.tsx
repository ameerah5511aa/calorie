import { Colors } from '@/constants/theme';
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

export default function HomeScreen() {
  const [calories, setCalories] = useState('');

  const handleShowExercise = () => {
    if (!calories) {
      Alert.alert('Please enter calories');
      return;
    }
    router.push('/explore');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background blobs */}
      <View style={styles.bgBlob} />
      <View style={styles.bgLine} />

      {/* Header with avatar */}
      <View style={styles.header}>
        <View style={styles.profileAvatar}>
          <Text style={styles.avatarEmoji}>👩‍🦱</Text>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.inputLabel}>Enter Calories</Text>
        <TextInput
          style={styles.calorieInput}
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          placeholder=""
        />
        <TouchableOpacity style={styles.actionBtn} onPress={handleShowExercise}>
          <Text style={styles.actionBtnText}>show exercise</Text>
        </TouchableOpacity>

        <View style={styles.warningCard}>
          <TouchableOpacity style={styles.warningClose}>
            <Text style={styles.warningCloseText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.warningTitle}>
            <View style={styles.warningIcon}>
              <Text style={styles.warningIconText}>!</Text>
            </View>
            <Text style={styles.warningTitleText}>Health Warning</Text>
          </View>
          <Text style={styles.warningText}>
            Consult your doctor before starting any training program.
          </Text>
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center',
  },
  inputLabel: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 12,
    color: Colors.light.text,
  },
  calorieInput: {
    width: 180,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  warningCard: {
    backgroundColor: Colors.light.purpleLight,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    borderRadius: 16,
    marginTop: 60,
    padding: 20,
    width: '100%',
    position: 'relative',
  },
  warningClose: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
  warningCloseText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  warningTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 8,
  },
  warningIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.light.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningIconText: {
    fontSize: 10,
    color: Colors.light.purple,
  },
  warningTitleText: {
    color: Colors.light.purple,
    fontWeight: '700',
    fontSize: 14,
  },
  warningText: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 18,
  },
});