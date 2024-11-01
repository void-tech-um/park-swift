import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { useState } from 'react';
import { getUser } from '../firebaseFunctions/firebaseFirestore';
import MenuSearchBar from './search';
import { useFocusEffect } from '@react-navigation/native';
import ListingCard from '../components/ListingCard';
import listingsData from '../components/listingsData';
import User from '../assets/profile.png';

function ProfileScreen({ navigation, route }) {
    const userId = route.params.userId;
    const [myUser, setMyUser] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            getUser(userId)
                .then((userData) => {
                    console.log('Fetched user data:', userData);
                    setMyUser(userData);
                })
                .catch((error) => {
                    console.error('Error fetching profile:', error);
                });
        }, [userId])
    );

    const handleProfileUpdate = (updatedUser) => {
        setMyUser(updatedUser);
    };

    const onPostPress = () => {
        navigation.navigate('EditProfile', { user: myUser, onProfileUpdate: handleProfileUpdate });
    };

    if (!myUser) {
        return <Text>Loading...</Text>;
    }

    const [firstName, lastName] = myUser.fullName ? myUser.fullName.split(' ') : ['First', 'Last'];

    return (
        <View style={styles.container}>
            <MenuSearchBar showSearchBar={false} />
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableOpacity onPress={onPostPress}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
                <Image
                    source={User}
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>{firstName} {lastName}</Text>
                <View style={styles.bioContainer}>
                    <Text style={styles.bioText}>
                        {myUser.bio || "Hello! Please feel free to reach out about any concerns. I'm very flexible!"}
                    </Text>
                </View>
                <Text style={styles.contactText}>{myUser.email}</Text>
                <Text style={styles.contactText}>{myUser.phoneNumber}</Text>
                <Text style={styles.listingsHeader}>My listings:</Text>
                <View style={styles.listingsContainer}>
                    {listingsData.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            address={listing.address}
                            date={listing.date}
                            startTime={listing.startTime}
                            endTime={listing.endTime}
                            image={listing.image}
                            ppHour={listing.ppHour}
                            listingURL={listing.listingURL}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    editProfileText: {
        color: '#0653A1',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginTop: 35,
        marginBottom: -5,
    },
    profileImage: {
        width: 190,
        height: 190,
        alignSelf: 'center',
        marginBottom: 5,
    },
    userName: {
        fontSize: 28,
        fontFamily: 'NotoSansTaiTham-Bold',
        letterSpacing: -1,
        textAlign: 'center',
    },
    bioContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    bioText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
        textAlign: 'left',
        paddingHorizontal: 71,
        alignSelf: 'center',
        marginTop: -5,
        lineHeight: 20,
        marginBottom: -3,
    },
    contactText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    listingsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 19,
    },
    scrollViewContainer: {
        paddingBottom: '28%',
    },
    listingsContainer: {
        alignItems: 'center',
    },
});

export default ProfileScreen;
