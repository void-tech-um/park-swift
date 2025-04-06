import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ResetConfirmationScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.checkIcon}
            />

            <Text style={styles.title}>Password Reset{'\n'}Successful!</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LoginScreen')}
            >
                <Text style={styles.buttonText}>Return to Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00245D',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    checkIcon: {
        width: 100,
        height: 100,
        marginBottom: 40,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        color: '#FFD766',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 32,
    },
    button: {
        backgroundColor: '#FFD766',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 80,
    },
    buttonText: {
        color: '#00245D',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
