import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, } from 'react-native';

export default function CreateAccountScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Image source={require('../assets/Back.png')} style={styles.backIcon} />
            </TouchableOpacity>

            <Image source={require('../assets/logo.png')} style={styles.logo} />

            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#777"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Password"
                    placeholderTextColor="#777"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                {/*<Image source={require('../assets/eye-off.png')} style={styles.eyeIcon} />*/}
            </View>

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Confirm password"
                    placeholderTextColor="#777"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                {/*<Image source={require('../assets/eye-off.png')} style={styles.eyeIcon} />*/}
            </View>

            <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createText}>Create Account</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
                By creating an account or signing up,{"\n"}you agree to our{' '}
                <Text style={styles.linkText}>Terms and Conditions</Text>
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00245D',
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    backIcon: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD766',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 15,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '100%',
        paddingRight: 14,
        marginBottom: 15,
    },
    inputPassword: {
        flex: 1,
        padding: 14,
        fontSize: 16,
    },
    eyeIcon: {
        width: 20,
        height: 20,
        tintColor: '#777',
    },
    createButton: {
        backgroundColor: '#FFD766',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 50,
        marginTop: 10,
        marginBottom: 30,
    },
    createText: {
        color: '#00245D',
        fontWeight: 'bold',
        fontSize: 18,
    },
    termsText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    linkText: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
