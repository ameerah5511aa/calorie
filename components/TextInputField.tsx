import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '@/constants/theme';

type Props = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

export default function TextInputField({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType = 'default',
}: Props) {
    return (
        <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: Colors.light.textSecondary,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});
