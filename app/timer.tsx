import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TimerScreen() {
  const { name, duration, icon, met } = useLocalSearchParams();
  const router = useRouter();
  
  // تحويل المدة القادمة من الواجهة السابقة إلى ثوانٍ للعداد
  const [seconds, setSeconds] = useState(parseInt(duration as string) * 60 || 0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      // تم الوصول لصفر: حساب السعرات والانتقال
      setIsActive(false);
      handleFinish();
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleFinish = () => {
    // 1. تطبيق المعادلة البرمجية لحساب السعرات المحروقة فعلياً
    // Calories = (MET * 3.5 * Weight / 200) * Duration
    const weight = 70; // الوزن الافتراضي
    const metValue = parseFloat(met as string) || 3.5;
    const durationInMin = parseInt(duration as string);
    
    const burned = Math.round((metValue * 3.5 * weight / 200) * durationInMin);

    // 2. الانتقال لواجهة الإنجاز (summary) وإرسال النتيجة
    router.push({
      pathname: '/summary',
      params: { burnedCalories: burned }
    });
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topDecoration} />
      
      <TouchableOpacity onPress={() => router.back()} style={styles.header}>
        <Text style={styles.backText}>‹ Exercise</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.exerciseName}>{name}</Text>
        
        <View style={styles.timerWrapper}>
          {/* دائرة الموقت البنفسجية */}
          <View style={styles.circle}>
             <Text style={styles.exerciseIcon}>{icon}</Text>
          </View>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.btnRestart} 
            onPress={() => setSeconds(parseInt(duration as string) * 60)}
          >
            <Text style={styles.btnTextRestart}>Restart</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnPause} 
            onPress={() => setIsActive(!isActive)}
          >
            <Text style={styles.btnTextPause}>{isActive ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* الموجات البنفسجية في أسفل الشاشة */}
      <View style={styles.bottomWaves}>
         <View style={[styles.wave, {backgroundColor: '#EBDDFF', height: 80}]} />
         <View style={[styles.wave, {backgroundColor: '#B57DFF', height: 50, opacity: 0.8}]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  topDecoration: { position: 'absolute', top: -50, left: -50, width: 200, height: 200, backgroundColor: '#E6F4E1', borderRadius: 100, zIndex: -1 },
  header: { padding: 20 },
  backText: { color: '#A5C94E', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 50 },
  exerciseName: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  timerWrapper: { alignItems: 'center' },
  circle: { 
    width: 220, height: 220, borderRadius: 110, 
    borderWidth: 8, borderColor: '#B57DFF', 
    justifyContent: 'center', alignItems: 'center', 
    marginBottom: 20 
  },
  exerciseIcon: { fontSize: 60 },
  timerText: { fontSize: 48, fontWeight: 'bold', color: '#333' },
  controls: { flexDirection: 'row', marginTop: 40, gap: 15 },
  btnRestart: { paddingHorizontal: 30, paddingVertical: 12, borderRadius: 15, borderWidth: 2, borderColor: '#B57DFF' },
  btnTextRestart: { color: '#B57DFF', fontWeight: 'bold' },
  btnPause: { paddingHorizontal: 40, paddingVertical: 12, borderRadius: 15, backgroundColor: '#B57DFF' },
  btnTextPause: { color: '#FFF', fontWeight: 'bold' },
  bottomWaves: { position: 'absolute', bottom: 0, width: '100%' },
  wave: { width: '120%', left: '-10%', borderTopLeftRadius: 100, borderTopRightRadius: 100, position: 'absolute', bottom: 0 }
});