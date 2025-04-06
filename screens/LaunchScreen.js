import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'


function LaunchScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <TouchableOpacity
                style={styles.signInButton}
                onPress={() => navigation.navigate('LoginMethodsScreen')}
            >
                <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate('CreateAccountScreen')}
            >
                <Text style={styles.createText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#052658',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 234,
        height: 242,
        marginBottom: '50%',
        resizeMode: 'contain',
    },
    signInButton: {
        backgroundColor: '#FED869',
        borderRadius: 19,
        paddingVertical: '3.5%',
        paddingHorizontal: '35%',
        marginBottom: '3.5%',
    },
    signInText: {
        color: '#052658',
        fontFamily: 'NotoSansTaiTham-Bold',
        fontSize: 18,
    },
    createButton: {
        backgroundColor: '#0653A1',
        borderRadius: 19,
        paddingVertical: '3.5%',
        paddingHorizontal: '26.2%',
    },
    createText: {
        color: 'white',
        fontFamily: 'NotoSansTaiTham-Bold',
        fontSize: 18,
    },
})

export default LaunchScreen;