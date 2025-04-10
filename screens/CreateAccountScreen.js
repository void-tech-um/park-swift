import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CreateAccountScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleCreateAccount = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        // Add account creation logic here
        alert('Account created (mock)');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/Back.png')} style={styles.backIcon} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />

                <Text style={styles.title}>Create Account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    placeholderTextColor="#888"
                    onChangeText={setEmail}
                    value={email}
                    autoCapitalize="none"
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                        value={password}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        placeholder="Confirm password"
                        placeholderTextColor="#888"
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                    <Text style={styles.buttonText}>Create Account</Text>
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
        top: '6%',
        left: '5%',
        zIndex: 10,
    },
    backIcon: {
        width: 45,
        height: 45,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    logoImage: {
        width: 234,
        height: 242,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        color: '#FED869',
        fontFamily: 'NotoSansTaiTham-Bold',
        marginBottom: 20,
    },
    input: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        width: '100%',
        marginBottom: 20,
        fontFamily: 'NotoSansTaiTham',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    eyeIcon: {
        position: 'absolute',
        right: '5%',
    },
    button: {
        backgroundColor: '#FED869',
        borderRadius: 20,
        height: 58,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#052658',
        fontSize: 18,
        fontFamily: 'NotoSansTaiTham-Bold',
    },
    footerText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'NotoSansTaiTham',
        paddingHorizontal: 10,
    },
    link: {
        color: 'white',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontFamily: 'NotoSansTaiTham-Bold',
    },
});
