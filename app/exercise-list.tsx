import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExerciseList() {
  const { calories } = useLocalSearchParams();
  const router = useRouter();
  
  const userWeight = 70; 
  const inputCalories = parseFloat(calories as string) || 0;

  const exercisesDB = [
    { id: 1, name: 'Treadmill', detail: 'speed 3/incline 0', met: 3.5, icon: '🏃‍♂️' },
    { id: 2, name: 'Jump Rope', detail: '3 rounds', met: 12.0, icon: '🪢' },
    { id: 3, name: 'Cycling', detail: 'medium speed', met: 7.5, icon: '🚴‍♂️' },
    { id: 4, name: 'Running', detail: 'outdoor', met: 9.0, icon: '🏃' },
    { id: 5, name: 'Rowing Machine', detail: 'standard', met: 6.0, icon: '🚣‍♂️' },
  ];

  const calculateDuration = (met: number) => {
    const duration = (inputCalories * 200) / (met * 3.5 * userWeight);
    return Math.round(duration) || 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topDecoration} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.profileIcon}><Text>👩</Text></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList}>
        {exercisesDB.map((ex) => (
          <TouchableOpacity 
            key={ex.id} 
            style={styles.card}
            onPress={() => router.push({
              pathname: '/timer',
              params: { name: ex.name, duration: calculateDuration(ex.met), icon: ex.icon , met: ex.met }
            })}
          >
            <View style={styles.cardIcon}><Text style={{fontSize: 30}}>{ex.icon}</Text></View>
            <View style={styles.cardInfo}>
              <Text style={styles.exerciseTitle}>{ex.name}</Text>
              <Text style={styles.exerciseSub}>{ex.detail} • {calculateDuration(ex.met)} min</Text>
            </View>
            <Text style={styles.purpleArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomWaves}>
         <View style={[styles.wave, {backgroundColor: '#EBDDFF', height: 80}]} />
         <View style={[styles.wave, {backgroundColor: '#B57DFF', height: 50, opacity: 0.8}]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  topDecoration: { position: 'absolute', top: -50, left: -50, width: 250, height: 250, backgroundColor: '#E6F4E1', borderRadius: 125, zIndex: -1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  backButton: { padding: 10 },
  backArrow: { fontSize: 40, color: '#A5C94E' },
  profileIcon: { width: 45, height: 45, borderRadius: 22, backgroundColor: '#FFD3E0', justifyContent: 'center', alignItems: 'center' },
  scrollList: { paddingHorizontal: 25, paddingTop: 10, paddingBottom: 100 },
  card: { flexDirection: 'row', backgroundColor: '#F5F5F5', borderRadius: 20, padding: 15, marginBottom: 15, alignItems: 'center' },
  cardIcon: { width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { flex: 1, marginLeft: 10 },
  exerciseTitle: { fontSize: 18, fontWeight: 'bold', color: '#B57DFF' },
  exerciseSub: { fontSize: 13, color: '#888' },
  purpleArrow: { fontSize: 28, color: '#B57DFF' },
  bottomWaves: { position: 'absolute', bottom: 0, width: '100%' },
  wave: { width: '100%', borderTopLeftRadius: 100, borderTopRightRadius: 100, position: 'absolute', bottom: 0 }
});