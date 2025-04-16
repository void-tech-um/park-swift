import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image, ScrollView } from 'react-native';
import { loginUser } from '../firebaseFunctions/firebaseFirestore';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onFooterLinkPress = () => {
        navigation.navigate('CreateAccountScreen');
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
            <View style={styles.content}>
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
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                    <Text style={styles.buttonTitle}>Login</Text>
                </TouchableOpacity>
                <View style={styles.forgotContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>
                    Don’t have an account?{' '}
                    <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#052658',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    logoImage: {
        width: 234,
        height: 242,
    },
    loginTitle: {
        color: '#FED869',
        fontSize: 32,
        fontFamily: "NotoSansTaiTham-Bold",
        marginBottom: "4%",
        marginTop: "5%",
    },
    input: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: "4%",
        fontFamily: "NotoSansTaiTham",
        fontSize: 16,
        width: '90%',
        marginBottom: "3.5%",
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: "3.5%",
    },
    eyeIcon: {
        position: 'absolute',
        right: "5%",
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
    buttonTitle: {
        color: '#052658',
        fontSize: 18,
        fontFamily: "NotoSansTaiTham-Bold",
    },
    forgotText: {
        color: 'white',
        textAlign: 'right',
        width: '80%',
        fontSize: 14,
        fontFamily: "NotoSansTaiTham",
    },
    forgotContainer: {
        width: '90%',
        alignItems: 'flex-end',
    },
    footerText: {
        fontSize: 14,
        color: 'white',
        fontFamily: "NotoSansTaiTham",
    },
    footerLink: {
        color: 'white',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontFamily: "NotoSansTaiTham-Bold",
    },
    footerView: {
        alignItems: 'center',
        marginBottom: "12.5%",
    },    
});
