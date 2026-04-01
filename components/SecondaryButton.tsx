import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';

type Props = {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
};

export default function SecondaryButton({ title, onPress, style }: Props) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.light.accent,
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: Colors.light.accent,
        fontSize: 18,
        fontWeight: '600',
    },
});
