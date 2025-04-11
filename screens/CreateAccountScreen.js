import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from '../firebaseFunctions/firebaseFirestore';

export default function CreateAccountScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleCreateAccount = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
    
        if (!email || !password) {
            alert('Email and password are required.');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters.');
            return;
        }
        
        try {
            const fullName = ''; 
            await registerUser(email, password, fullName);
            navigation.navigate('Login');
        } catch (error) {
            console.error('Registration error:', error);
            alert(error.message);
        }
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
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={[styles.input, { marginBottom: 0 }]}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
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
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={[styles.input, { marginBottom: 0 }]}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        secureTextEntry={!showConfirmPassword} 
                        onChangeText={(text) => setConfirmPassword(text)}
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
    logoImage: {
        width: 234,
        height: 242,
        marginBottom: "7.5%",
    },
    title: {
        fontSize: 32,
        color: '#FED869',
        fontFamily: 'NotoSansTaiTham-Bold',
        marginBottom: "5%",
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
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 60,
        width: '90%',
        marginBottom: '3.5%',
    },
    eyeIcon: {
        position: 'absolute',
        right: '5%',
    },
    button: {
        backgroundColor: '#FED869',
        borderRadius: 18,
        height: 58,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "2.5%",
    },
    buttonText: {
        color: '#052658',
        fontSize: 18,
        fontFamily: 'NotoSansTaiTham-Bold',
    },
});
