import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { useNavigation, } from '@react-navigation/native';
import { getUser, getPost } from '../firebaseFunctions/firebaseFirestore';
import Back from '../assets/Back.png'; 
import User from '../assets/profile.png';
import FitsAllModels from '../assets/FitsAllModels.png'; 
import WeatherProtected from '../assets/WeatherProtected.png'; 
import PavedEntrance from '../assets/PavedEntrance.png'; 
import PrivateProperty from '../assets/PrivateProperty.png';  
import Unsave from '../assets/Save.png'; 
import Save from '../assets/saved_icon.png';
import CarImage from '../assets/CarImage.png'; 
import MenuSearchBar from '../components/MenuSearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";

const ListingScreen = ({ route }) => {
    const navigation = useNavigation();
    const { 
        address, 
        ppHour, 
        userID, 
        postId, 
        startDate, 
        endDate, 
        isAvailable,
    } = route.params || {};

    const [currentUserId, setCurrentUserId] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [fullName, setFullName] = useState('User Name');

    const displayAddress = address ? address.split(',')[0] : 'No address available';
    
    const formatCostText = (cost) => {
        if (!cost) return "";
        
        return cost.replace('hr', 'hour').replace('semstr', 'semester');
    };    

    const removeSpaces = (text) => {
        return text.replace(/\s/g, '');
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                setCurrentUserId(user.uid); // Set the logged-in user ID
            }
        };
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (route.params?.refresh && postId) {
            console.log("Refreshing ListingScreen after edit/delete...");
            
        getPost(postId)
            .then((updatedPost) => {
                if (updatedPost) {
                    setAddress(updatedPost.location);
                    setPrice(updatedPost.price);
                    setStartDate(updatedPost.firstDate);
                    setEndDate(updatedPost.lastDate);
                    setIsAvailable(updatedPost.isAvailable);
                } else {
                    // If post is deleted, navigate away from ListingScreen
                    alert("Listing has been deleted.");
                    navigation.navigate("HomeScreen"); // Redirect user to HomeScreen
                }
            })
            .catch((error) => {
                console.error("Error fetching updated post:", error);
            });
        }
    }, [route.params?.refresh, postId]);   

    useEffect(() => {
        const fetchUserData = async () => {
            if (userID) {
                try {
                    const userData = await getUser(userID);
                    if (userData?.fullName) {
                        setFullName(userData.fullName);
                    } else {
                        setFullName("User Name");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setFullName("User Name");
                }
            }
        };
    
        fetchUserData();
    }, [userID]);
    
    useFocusEffect(
        React.useCallback(() => {
            const checkSavedState = async () => {
                try {
                    const savedListings = await AsyncStorage.getItem('savedListings');
                    const savedListingsArray = savedListings ? JSON.parse(savedListings) : [];
                    const listingSaved = savedListingsArray.some(item => item.postId === postId);
                    setIsSaved(listingSaved);
                } catch (error) {
                    console.error("Error loading saved state:", error);
                }
            };
            checkSavedState();
        }, [postId])
    );

    const handleSavePress = async () => {
        try {
            const savedListings = await AsyncStorage.getItem('savedListings');
            let savedListingsArray = savedListings ? JSON.parse(savedListings) : [];
    
            if (isSaved) {
                savedListingsArray = savedListingsArray.filter(item => item.postId !== postId);
            } else {
                savedListingsArray.push({
                    postId,
                    address,
                    ppHour,
                    startDate: startDate ? new Date(startDate).toISOString() : null,
                    endDate: endDate ? new Date(endDate).toISOString() : null,
                    isAvailable,
                    userID,
                });
            }
            await AsyncStorage.setItem('savedListings', JSON.stringify(savedListingsArray));
            setIsSaved(!isSaved);
        } catch (error) {
            console.error('Error saving listing:', error);
        }
    };
    
    const getFormattedEndDate = (startDate, endDate) => {
        let end = endDate?.toDate ? endDate.toDate() : new Date(endDate);
        let start = startDate?.toDate ? startDate.toDate() : new Date(startDate);
    
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            console.warn("Invalid startDate or endDate:", startDate, endDate);
            return "Invalid date"; 
        }
    
        let shouldIncrementEnd = false;
    
        if ((end - start) / (1000 * 60 * 60 * 24) > 1) {
            shouldIncrementEnd = true;
        }
    
        const startWeek = Math.ceil(start.getDate() / 7);
        const endWeek = Math.ceil(end.getDate() / 7);
    
        if (start.getMonth() === end.getMonth() && startWeek !== endWeek) {
            shouldIncrementEnd = true;
        }
    
        if (shouldIncrementEnd) {
            end.setDate(end.getDate() + 1);
        }
    
        return `${end.getMonth() + 1}/${end.getDate()+1}/${end.getFullYear()}`;
    };

    // Extract the year from startDate
    const listedYear = startDate ? new Date(startDate).getFullYear() : "Invalid date";
          
    return (
        <View style={styles.container}>
            <MenuSearchBar showSearchBar={false} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                source={Back}
                                style={styles.Back}
                            />
                        </TouchableOpacity>
                        <Text style={styles.listingHeading}>{displayAddress}</Text>
                    </View>
                    {currentUserId === userID && (
                        <TouchableOpacity 
                            onPress={() => {
                                console.log("Navigating to EditListingScreen with postId:", postId);
                                navigation.navigate('EditListingScreen', { 
                                    postId, 
                                    userId: userID, 
                                    address, 
                                    ppHour, 
                                    startDate, 
                                    endDate, 
                                    isAvailable 
                                });
                            }}
                        >
                            <Text style={styles.editListingText}>Edit Listing</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.carImagesContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Image
                                source={CarImage}
                                style={styles.FirstImage}
                            />
                            <Image
                                source={CarImage}
                                style={styles.SecondImage}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.userInfoContainer}>
                        <Image
                            source={User}
                            style={styles.UserImage}
                        />
                        <View style={styles.userInfoTextContainer}>
                            <Text style={styles.listedUser}>Listed by {fullName}</Text>
                            <Text style={styles.listingDate}>Listing since {listedYear}</Text>
                        </View>
                    </View>
                    {/*<View style={styles.iconRow}>
                        <Image
                            source={FitsAllModels}
                            style={styles.modelIcon}
                        />
                        <Image
                            source={PavedEntrance}
                            style={styles.pavedIcon}
                        />
                    </View>
                    <View style={styles.iconRow}>
                        <Image
                            source={WeatherProtected}
                            style={styles.weatherIcon}
                        />
                        <Image
                            source={PrivateProperty}
                            style={styles.privacyIcon}
                        />
                    </View>*/}

                    <View style={styles.listingInfoSection}>
                        <Text style={styles.listingInfo}>Listing Information</Text>
                        <Text style={styles.infoLabels}>Available from:</Text>
                        <View style={styles.border}>
                        <Text style={styles.description}>
                                {startDate
                                    ? `${new Date(startDate).getMonth() + 1}/${new Date(startDate).getDate()+1}/${new Date(startDate).getFullYear()}`
                                    : "Invalid date"}{" "}
                                -{" "}
                                {getFormattedEndDate(startDate, endDate)}
                            </Text>
                        </View>
                        <Text style={[styles.infoLabels, { marginTop: 10 }]}>Cost:</Text>
                        <View style={styles.border}>
                            <Text style={styles.costText}>{formatCostText(ppHour)}</Text>
                        </View>
                        <Text style={styles.additionalNotes}>Additional Notes</Text>
                        <View style={styles.bulletPointContainer}>
                            <Text style={styles.bulletPoint}>•</Text>
                            <Text style={styles.bulletText}>Please enter and exit the parking spot quietly</Text>
                        </View>
                        <View style={styles.bulletPointContainer}>
                            <Text style={styles.bulletPoint}>•</Text>
                            <Text style={styles.bulletText}>No other cars, go in and out as you please</Text>
                        </View>
                        <View style={styles.bulletPointContainer}>
                            <Text style={styles.bulletPoint}>•</Text>
                            <Text style={styles.bulletText}>Less than a mile from central campus and the big house.</Text>
                        </View>
                    </View>
                    <View style={styles.contactBorder}>
                        <View style={styles.textContainer}>
                            <Text style={styles.boldCostText}>{removeSpaces(formatCostText(ppHour))}</Text>
                            <Text style={styles.negotiableText}>Negotiable</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.contactButton}>
                                <Text style={styles.contactText}>Contact</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSavePress}>
                            <Image
                                source={isSaved ? Save : Unsave}
                                style={styles.saveIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingBottom:"3%",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    Back: {
        width: 45,
        height: 45,
        marginTop: -5,
    },
    listingHeading: {
        marginLeft: 22,
        fontSize: 28,
        fontFamily: "NotoSansTaiTham-Bold",
        letterSpacing: -1,
    },
    editListingButton: {
        marginLeft: 17, 
        alignItems: 'left',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    editListingText: {
        color: '#0653A1',
        fontSize: 15, 
        fontFamily: 'NotoSansTaiTham-Regular', 
    },
    carImagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: -10,
    },
    FirstImage: {
        width: 200,
        height: 200,
        marginTop: 7,
    },
    SecondImage: {
        width: 200,
        height: 200,
        marginTop: 7,
    },
    userInfoContainer: {
        flexDirection: 'row',
    },
    userInfoTextContainer: {
        marginLeft: 6,
    },
    UserImage: {
        width: 50,
        height: 50,
        marginLeft: 15,
        marginTop: 10,
    },
    listedUser:{
        fontSize: 24,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginTop: 6,
        letterSpacing: -0.5,
    },
    listingDate:{
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginTop: -7,
        marginLeft: 1,
    },
    iconRow: {
        flexDirection: 'row',
        marginTop: 18,
        marginLeft: 19,
    },
    modelIcon: {
        width: 144,
        height: 23,
    },
    pavedIcon: {
        width: 157,
        height: 25,
        marginLeft: 54,
    },
    weatherIcon: {
        width: 179,
        height: 30,
        marginLeft: -4,
    },
    privacyIcon: {
        width: 172,
        height: 27,
        marginLeft: 22.5,
    },
    listingInfo: {
        fontSize: 24,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginTop: 20,
        marginLeft: 17,
    },
    additionalNotes: {
        fontSize: 24,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginTop: 20,
        marginLeft: 17,
    },
    infoLabels: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginLeft: 17,
        marginTop: 5,
    },
    border: {
        width: 171,
        height: 39,
        borderRadius: 10,
        backgroundColor: '#EEEBDB',
        marginLeft: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    costText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    bulletPointContainer: {
        flexDirection: 'row',
        marginLeft: 25,
        alignItems: 'flex-start',
        marginVertical: 5,
        maxWidth: '90%',
    },
    bulletPoint: {
        fontSize: 25,
        marginRight: 7.5,
        lineHeight: 23.5,
    },
    bulletText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
        flex: 1,
        marginBottom: -10,
        letterSpacing: -0.5,
    },
    contactBorder: {
        flexDirection: 'row',
        width: '92%',
        height: 75,
        borderRadius: 20,
        backgroundColor: '#EEEBDB',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: '5%', 
        paddingHorizontal: '4%',
    },
    textContainer: {
        flex: 1,
        marginLeft: 5,
    },
    saveIcon: {
        width: 45,
        height: 45,
        marginRight: -4,
    },
    contactButton:{
        width: 120,
        height: 45,
        backgroundColor: '#0653A1',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '3.5%',
    },
    contactText:{
        color: "#ffffff",
        fontFamily: 'NotoSansTaiTham-Regular',
        fontSize: 20, 
    },
    boldCostText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
    },
    negotiableText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginTop: -5,
    },
});

export default ListingScreen;
