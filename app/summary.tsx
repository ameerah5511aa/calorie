import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SummaryScreen() {
  const { burnedCalories } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topDecoration} />
      
      <View style={styles.content}>
        {/* أيقونة الإنجاز (Like) */}
        <View style={styles.successBadge}>
           <Text style={styles.thumbIcon}>👍</Text>
        </View>

        <Text style={styles.title}>Great job! Workout completed</Text>

        {/* عرض السعرات المحروقة بناءً على المعادلة */}
        <View style={styles.resultCard}>
           <Text style={styles.caloriesNumber}>{burnedCalories}</Text>
           <Text style={styles.caloriesLabel}>Calories Burnt</Text>
        </View>

        <TouchableOpacity 
          style={styles.btnNew} 
          onPress={() => router.replace('/explore')} // العودة للبداية
        >
          <Text style={styles.btnText}>New Activity</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomWaves}>
         <View style={[styles.wave, {backgroundColor: '#EBDDFF', height: 80}]} />
         <View style={[styles.wave, {backgroundColor: '#B57DFF', height: 50, opacity: 0.8}]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  topDecoration: { position: 'absolute', top: -50, left: -50, width: 200, height: 200, backgroundColor: '#E6F4E1', borderRadius: 100 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  successBadge: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F0EFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 4, borderColor: '#B57DFF' },
  thumbIcon: { fontSize: 50 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  resultCard: { backgroundColor: '#F7F8FA', padding: 30, borderRadius: 20, alignItems: 'center', width: '80%', marginBottom: 50 },
  caloriesNumber: { fontSize: 40, fontWeight: 'bold', color: '#333' },
  caloriesLabel: { color: '#B57DFF', fontSize: 16, marginTop: 5 },
  btnNew: { backgroundColor: '#B57DFF', width: '100%', padding: 18, borderRadius: 15, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  bottomWaves: { position: 'absolute', bottom: 0, width: '100%' },
  wave: { width: '100%', borderTopLeftRadius: 100, borderTopRightRadius: 100, position: 'absolute', bottom: 0 }
});