import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    // Navigation will be handled automatically by root layout
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.bgBlob} />
      <View style={styles.bgLine} />
      <View style={styles.header}>
        <View style={styles.profileAvatar}>
          <Text style={styles.avatarEmoji}>👩‍🦱</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholder}>Profile Screen</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  placeholder: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});