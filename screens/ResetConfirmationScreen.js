import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ResetConfirmationScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/circle-check.png')}
                style={styles.icon}
                resizeMode="contain"
            />

            <Text style={styles.title}>Password Reset{"\n"}Successful!</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Return to Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#052658',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 115,
        height: 115,
        marginBottom: "5%",
    },
    title: {
        fontSize: 32,
        fontFamily: "NotoSansTaiTham-Bold",
        textAlign: 'center',
        color: '#FED869',
        marginBottom: "15%",
    },
    button: {
        backgroundColor: '#FED869',
        width: '90%',
        borderRadius: 18,
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "20%",
    },
    buttonText: {
        color: '#052658',
        fontSize: 18,
        fontFamily: "NotoSansTaiTham-Bold",
    },
});
