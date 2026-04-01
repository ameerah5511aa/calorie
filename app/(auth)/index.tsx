import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Purple background section - absolute */}
      <View style={styles.purpleBgContainer}>
        <View style={styles.purpleGraphic} />
      </View>

      {/* White content card overlapping */}
      <View style={styles.contentCard}>
        <Text style={styles.welcomeText}>Welcome To</Text>

        <View style={styles.logoContainer}>
          <Svg width={50} height={50} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 21C14.7614 21 17 18.7614 17 16C17 13.2386 14.5 12 12 9C9.5 12 7 13.2386 7 16C7 18.7614 9.23858 21 12 21Z"
              stroke={Colors.light.purple}
              strokeWidth={2}
            />
            <Path
              d="M12 19C13.1046 19 14 18.1046 14 17C14 15.8954 12 14 12 14C12 14 10 15.8954 10 17C10 18.1046 10.8954 19 12 19Z"
              fill={Colors.light.purple}
            />
          </Svg>
          <Text style={styles.logoText}>BurnIt</Text>
        </View>

        <Text style={styles.description}>
          Personalized Workouts to Match Your Calorie Goals
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnGreen}
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.divider}>or</Text>
          <TouchableOpacity
            style={styles.btnGreen}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // fallback
  },
  purpleBgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300, // enough to cover top area
    backgroundColor: '#8813C1',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  purpleGraphic: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    // Could add radial gradient effect with opacity, but simplified
    opacity: 0.4,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 200, // overlap purple area
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 25,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    color: '#8813C1',
    fontWeight: '800',
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 250,
    marginBottom: 60,
  },
  buttonContainer: {
    width: '100%',
  },
  btnGreen: {
    backgroundColor: '#14C873',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  divider: {
    color: '#8813C1',
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
});