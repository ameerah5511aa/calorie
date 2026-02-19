import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExerciseList() {
  const { calories } = useLocalSearchParams();
  const router = useRouter();
  
  // بيانات المستخدم والمدخلات
  const userWeight = 70; // كجم
  const inputCalories = parseFloat(calories as string);

  // قاعدة بيانات التمارين مع قيم MET بناءً على صورك
  const exercisesDB = [
    { id: 1, name: 'Treadmill', detail: 'speed 3 / incline 0', met: 3.5, icon: '🏃‍♂️' },
    { id: 2, name: 'Jump Rope', detail: '3 rounds', met: 12.0, icon: '跳' },
    { id: 3, name: 'Cycling', detail: 'medium speed', met: 7.5, icon: '🚴‍♂️' },
    { id: 4, name: 'Running', detail: 'outdoor', met: 9.0, icon: '🏃' },
    { id: 5, name: 'Rowing Machine', detail: 'standard', met: 6.0, icon: '🚣‍♂️' },
  ];

  // دالة المعادلة البرمجية: Duration (min) = (Calories * 200) / (MET * 3.5 * Weight)
  const calculateDuration = (met: number) => {
    if (!inputCalories) return 0;
    const duration = (inputCalories * 200) / (met * 3.5 * userWeight);
    return Math.round(duration);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* الجزء العلوي (الخلفية الخضراء الفاتحة في الزاوية) */}
      <View style={styles.topDecoration} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.profileIcon}>
           <Text style={{fontSize: 20}}>👩</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchText}>🔍 Search</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList} showsVerticalScrollIndicator={false}>
        {exercisesDB.map((ex) => (
          <TouchableOpacity key={ex.id} style={styles.card}>
            <View style={styles.cardIcon}>
              <Text style={{fontSize: 30}}>{ex.icon}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.exerciseTitle}>{ex.name}</Text>
              <Text style={styles.exerciseSub}>{ex.detail} • {calculateDuration(ex.met)} min</Text>
            </View>
            <Text style={styles.purpleArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* الموجات البنفسجية في أسفل الشاشة كما في التصميم */}
      <View style={styles.bottomWaves}>
         <View style={[styles.wave, {backgroundColor: '#EBDDFF', bottom: 0, height: 80}]} />
         <View style={[styles.wave, {backgroundColor: '#B57DFF', bottom: 0, height: 50, opacity: 0.8}]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  topDecoration: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 250,
    height: 250,
    backgroundColor: '#E6F4E1', // اللون الأخضر الفاتح في الخلفية
    borderRadius: 125,
    zIndex: -1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 20,
    alignItems: 'center',
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  backArrow: { fontSize: 35, color: '#A5C94E' }, // لون السهم الأخضر
  profileIcon: { width: 45, height: 45, borderRadius: 22, backgroundColor: '#FFD3E0', justifyContent: 'center', alignItems: 'center' },
  searchBar: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 40,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  searchText: { color: '#AAA', fontSize: 16 },
  scrollList: { paddingHorizontal: 30, paddingBottom: 100 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardIcon: { width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { flex: 1, marginLeft: 10 },
  exerciseTitle: { fontSize: 18, fontWeight: 'bold', color: '#B57DFF' }, // اللون البنفسجي للعنوان
  exerciseSub: { fontSize: 13, color: '#888', marginTop: 3 },
  purpleArrow: { fontSize: 28, color: '#B57DFF', fontWeight: 'bold' },
  bottomWaves: { position: 'absolute', bottom: 0, width: '100%', height: 100, zIndex: -1 },
  wave: { position: 'absolute', width: '120%', left: '-10%', borderTopLeftRadius: 100, borderTopRightRadius: 100 },
});