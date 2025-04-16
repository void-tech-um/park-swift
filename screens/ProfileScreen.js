import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { getUser } from '../firebaseFunctions/firebaseFirestore';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { database } from '../firebaseFunctions/firebaseFirestore'; 
import MenuSearchBar from '../components/MenuSearchBar';
import { useFocusEffect } from '@react-navigation/native';
import ListingCard from '../components/ListingCard';
import User from '../assets/profile.png';

function ProfileScreen({ navigation, route }) {
    const userId = route.params.userId;
    const [myUser, setMyUser] = useState(null);
    const [myListings, setMyListings] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getUser(userId)
                .then((userData) => {
                    setMyUser(userData);
                })
                .catch((error) => {
                    console.error('Error fetching profile:', error);
                });

            fetchUserListings(userId);
        }, [userId])
    );

    async function fetchUserListings(userId) {
        try {
            const postsCollectionRef = collection(database, "posts");
            const q = query(postsCollectionRef, where("userID", "==", userId)); 
            const querySnapshot = await getDocs(q);

            const userPosts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setMyListings(userPosts);
        } catch (error) {
            console.error("Error fetching user listings:", error);
        }
    }

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
                    source={myUser?.profileImage ? { uri: myUser.profileImage } : User}
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>{firstName} {lastName}</Text>
                <View style={styles.bioContainer}>
                    <Text style={styles.bioText}>
                        {myUser.bio ? myUser.bio : "Hello! Please feel free to reach out about any concerns. I'm very flexible!"}
                    </Text>
                </View>
                <Text style={styles.contactText}>{myUser.email}</Text>
                <Text style={styles.contactText}>{myUser.phoneNumber}</Text>
                <Text style={styles.listingsHeader}>My Listings:</Text>
                <View style={styles.listingsContainer}>
                    {myListings.length === 0 ? (
                        <Text style={styles.noListingsText}>No listings available.</Text>
                    ) : (
                        myListings.map((post) => (
                            <ListingCard
                                key={post.id}
                                address={post.location || 'No address available'}
                                startDate={post.firstDate}  
                                endDate={post.lastDate}     
                                startTime={post.startTime}
                                endTime={post.endTime}
                                ppHour={`$${post.price} / ${post.rentalPeriod}`}
                                isNegotiable={post.negotiable ? 'Negotiable' : 'Fixed Price'}
                                carSize={post.sizeOfCar || "Size not specified"}
                                userID={post.userID}
                            />
                        ))
                    )}
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
        borderRadius: "100%",
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
        paddingBottom: '5%',
    },
    listingsContainer: {
        alignItems: 'center',
    },
    noListingsText: {
        fontSize: 18,
        fontFamily: "NotoSansTaiTham-Bold",
        color: '#000000',
        textAlign: 'center',
    },
});

export default ProfileScreen;
