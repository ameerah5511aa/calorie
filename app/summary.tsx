import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SummaryScreen() {
  const { burnedCalories } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
  <Text style={styles.title}>Activity Summary</Text>

  <View style={styles.totalCard}>
    <Text style={styles.totalLabel}>Total Calories Burned</Text>
    <Text style={styles.totalValue}>1,250 kcal</Text>
  </View>

  <Text style={styles.historyTitle}>Recent Activities</Text>

  <View style={styles.historyCard}>
    <Text style={styles.activityName}>Running</Text>
    <Text style={styles.activityInfo}>30 min • 300 kcal</Text>
  </View>

  <View style={styles.historyCard}>
    <Text style={styles.activityName}>Cycling</Text>
    <Text style={styles.activityInfo}>25 min • 250 kcal</Text>
  </View>

</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#F9F7FF',
  padding: 20,
},

title: {
  fontSize: 24,
  fontWeight: '700',
  color: '#6C63FF',
  marginBottom: 20,
},

totalCard: {
  backgroundColor: '#6C63FF',
  borderRadius: 20,
  padding: 25,
  marginBottom: 25,
},

totalLabel: {
  color: '#EDEBFF',
  fontSize: 16,
},

totalValue: {
  color: '#FFFFFF',
  fontSize: 28,
  fontWeight: 'bold',
  marginTop: 5,
},

historyTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 15,
},

historyCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 15,
  padding: 18,
  marginBottom: 15,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 3,
},

activityName: {
  fontSize: 16,
  fontWeight: '600',
},

activityInfo: {
  fontSize: 14,
  color: '#666',
  marginTop: 4,
},
});
