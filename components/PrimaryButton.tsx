import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';

type Props = {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    disabled?: boolean;
};

export default function PrimaryButton({ title, onPress, style, disabled }: Props) {
    return (
        <TouchableOpacity
        style={[styles.button, style, disabled && styles.disabled]}
        onPress={onPress}
        disabled={disabled}
        >
        <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.accent,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
