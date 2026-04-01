import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StatusHeader() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.time}>9:41</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 8,
    },
    time: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});
