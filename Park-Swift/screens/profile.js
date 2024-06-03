import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { getUser } from '../firebaseFunctions/firebaseFirestore';
import MenuSearchBar from './search';
import { useFocusEffect } from '@react-navigation/native';

function ProfileScreen({ navigation, route }) {
    const userId = route.params.userId;

    const onPostPress = async () => {
        try {
            navigation.navigate('EditProfile', { userId });
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const [myUser, setMyUser] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            getUser(userId)
                .then((userData) => {
                    console.log('User data:', userData); // Log user data to verify
                    setMyUser(userData);
                })
                .catch((error) => {
                    console.error('Error fetching profile:', error);
                });
        }, [userId])
    );

    if (!myUser) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <MenuSearchBar showSearchBar={false} />
            <View style={styles.body}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onPostPress} style={styles.button}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatar}>img</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{myUser.fullname}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.bioText}>Hello, I am your name</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoText}>{myUser.email}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Contact:</Text>
                    <Text style={styles.infoText}>{myUser.email}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Listing', { address: '419 S State St, Ann Arbor', ppHour: '$10.50 /hr', id: 1, myUser })}
                >
                    <Text style={styles.buttonText}>Go to Listing</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        marginTop: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 0.16,
    },
    avatar: {
        fontSize: 72,
        fontWeight: '700',
    },
    nameContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    name: {
        fontSize: 40,
        fontWeight: '600',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    infoLabel: {
        fontSize: 24,
        fontWeight: '600',
        color: '#666666',
        marginRight: 8,
    },
    infoText: {
        fontSize: 24,
    },
    bioText: {
        fontSize: 20,
        color: '#666666',
    },
    buttonText: {
        color: "#3399FF",
    },
    buttonContainer: {
        bottom: 20,
    },
});

export default ProfileScreen;