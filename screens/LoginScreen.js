import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { loginUser } from '../firebaseFunctions/firebaseFirestore';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    };

    const onLoginPress = () => {
        loginUser(email, password)
            .then((data) => {
                navigation.navigate('Tab', { userId: data.user.uid });
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/Back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={styles.scrollContainer}
            >
                <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
                <Text style={styles.loginTitle}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    placeholderTextColor="#888"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#666" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                    <Text style={styles.buttonTitle}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Forgot Password Pressed')}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Don’t have an account?{' '}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#052658',
    },
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    backIcon: {
        width: 40,
        height: 40,
    },
    logoImage: {
        width: 250,
        height: 180,
        marginBottom: 20,
    },
    loginTitle: {
        color: '#FED869',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        width: '80%',
        marginBottom: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
    },
    button: {
        backgroundColor: '#FED869',
        width: '80%',
        borderRadius: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonTitle: {
        color: '#00214D',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotText: {
        color: 'white',
        textAlign: 'right',
        width: '80%',
        marginBottom: 40,
    },
    footerView: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: 'white',
    },
    footerLink: {
        color: 'white',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});