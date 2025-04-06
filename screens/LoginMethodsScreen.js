import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
WebBrowser.maybeCompleteAuthSession();
import appleAuth, { AppleAuthRequestOperation, AppleAuthRequestScope } from '@invertase/react-native-apple-authentication';

export default function LoginMethodsScreen({ navigation }) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
        iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
        webClientId: '605780498133-sj7bral36amhuhisvgs3qf0tk4dcn59v.apps.googleusercontent.com',
    });
    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.authentication;
            const credential = GoogleAuthProvider.credential(id_token);
            const auth = getAuth();
            signInWithCredential(auth, credential)
                .then((userCredential) => {
                    // You can create user doc in Firestore here if needed
                    console.log('Google user:', userCredential.user);
                })
                .catch((error) => {
                    console.error('Google sign-in error:', error);
                });
        }
    }, [response]);

    const handleAppleLogin = async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGIN,
                requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
            });
    
            const { identityToken, nonce } = appleAuthRequestResponse;
    
            if (identityToken) {
                const provider = new OAuthProvider('apple.com');
                const credential = provider.credential({ idToken: identityToken, rawNonce: nonce });
    
                const auth = getAuth();
                const userCredential = await signInWithCredential(auth, credential);
                console.log('Apple user:', userCredential.user);
            }
        } catch (error) {
            console.error('Apple Sign-In error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/Back.png')} style={styles.backIcon} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <TouchableOpacity style={styles.methodButton} onPress={() => promptAsync()}>
                <View style={styles.buttonContent}>
                    <Image source={require('../assets/Google.png')} style={styles.methodIcon} />
                    <Text style={styles.methodText}>Continue with Google</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.methodButton} onPress={handleAppleLogin}>
                <View style={styles.buttonContent}>
                    <Image source={require('../assets/Apple.png')} style={styles.methodIcon} />
                    <Text style={styles.methodText}>Continue with Apple</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.methodButton}
                onPress={() => navigation.navigate('LoginScreen')}
            >
                <View style={styles.buttonContent}>
                    <Image source={require('../assets/Mail.png')} style={styles.methodIcon} />
                    <Text style={styles.methodText}>Continue with Email</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.footerRow}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.footerLink}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#052658',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top:'5.5%', 
        left: '5%',      
    },
    backIcon: {
        width: 45,
        height: 45,
    },
    logo: {
        width: 234,
        height: 242,
        resizeMode: 'contain',
    },
    logoContainer: {
        marginTop: '12%',
        marginBottom: '42%',
    },    
    methodButton: {
        backgroundColor: '#fff',
        borderRadius: 28,
        paddingVertical: '4%',
        paddingHorizontal: '15%',
        marginBottom: '4%',
        width: '90%',
    },
    buttonContent: {
        flexDirection: 'row',
    },
    methodIcon: {
        width: 20,
        height: 20,
        marginRight: '6%',
        marginLeft: '-16%',
        resizeMode: 'contain',
        marginTop: '0.4%',
    },    
    methodText: {
        color: '#052658',
        fontFamily: 'NotoSansTaiTham-Bold',
        fontSize: 16,
    },
    footerRow: {
        flexDirection: 'row',
        marginTop: '2%'
    },
    footerText: {
        color: 'white',
        fontFamily: 'NotoSansTaiTham',
        fontSize: 14,
    },
    footerLink: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Bold',
        textDecorationLine: 'underline',
    },
});
