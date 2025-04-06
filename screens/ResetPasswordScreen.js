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

export default function ResetPasswordScreen({ navigation }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/Back.png')} style={styles.backIcon} />
            </TouchableOpacity>

            <Text style={styles.title}>Reset Password</Text>

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="New Password"
                    placeholderTextColor="#777"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                
            </View>

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Confirm New Password"
                    placeholderTextColor="#777"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                
            </View>

            <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => navigation.navigate('ResetConfirmationScreen')}
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
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFD766',
        marginBottom: 30,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '100%',
        paddingRight: 14,
        marginBottom: 20,
    },
    inputPassword: {
        flex: 1,
        padding: 14,
        fontSize: 16,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#777',
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
