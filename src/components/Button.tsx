import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from './Colors';

interface CustomButtonProps {
    press: () => void;
    text: string;
}

function CustomButton({ press, text }: CustomButtonProps) {
    return (
        <TouchableOpacity onPress={press} style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 25,
        backgroundColor: Colors.primary,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    },
});

export default CustomButton;
