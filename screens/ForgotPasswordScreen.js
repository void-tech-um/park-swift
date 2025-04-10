import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        // Add password reset logic here (e.g. Firebase reset password)
        alert('Password reset link sent (mock)');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/Back.png')} style={styles.backIcon} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Image
                    source={require('../assets/lock.png')} // make sure to add a lock icon in assets
                    style={styles.lockIcon}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>Enter your email below to reset your password.</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    placeholderTextColor="#888"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#052658',
    },
    backButton: {
        position: 'absolute',
        top: "6%",
        left: "5%",
    },
    backIcon: {
        width: 45,
        height: 45,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockIcon: {
        width: 127,
        height: 127,
        marginBottom: "10%",
    },
    title: {
        fontSize: 32,
        color: '#FED869',
        fontFamily: "NotoSansTaiTham-Bold",
        marginBottom: "1%",
    },
    subtitle: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        fontFamily: "NotoSansTaiTham",
        marginBottom: "10%",
    },
    input: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: "4%",
        fontSize: 16,
        width: '90%',
        fontFamily: "NotoSansTaiTham",
        marginBottom: "3%",
    },
    button: {
        backgroundColor: '#FED869',
        width: '90%',
        borderRadius: 18,
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "3%",
    },
    buttonText: {
        color: '#052658',
        fontSize: 18,
        fontFamily: "NotoSansTaiTham-Bold",
    },
});
