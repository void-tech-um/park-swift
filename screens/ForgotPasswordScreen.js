import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Image source={require('../assets/Back.png')} style={styles.backIcon} />
            </TouchableOpacity>

            

            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
                Enter your email below to reset{'\n'}your password.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#777"
                value={email}
                onChangeText={setEmail}
            />

            <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => navigation.navigate('ResetPasswordScreen')}
            >
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#00245D',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backIcon: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
    },
    lockIcon: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFD766',
        marginBottom: 10,
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: '#FFD766',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 100,
    },
    continueText: {
        color: '#00245D',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
