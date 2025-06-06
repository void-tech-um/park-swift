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
import CarImage from '../assets/image.png'; 
import MenuSearchBar from '../components/MenuSearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { Linking, FlatList, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth * 0.70;
const imageSpacing = screenWidth * 0.025;

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
        images: routeImages,
    } = route.params || {};

    const [currentUserId, setCurrentUserId] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [fullName, setFullName] = useState('');
    const [isNegotiable, setIsNegotiable] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [addressState, setAddress] = useState(address);
    // const [ppHourState, setPrice] = useState(ppHour);
    
    const [price, setPrice] = useState(null);
    const [rentalPeriod, setRentalPeriod] = useState(null);

    const [startDateState, setStartDate] = useState(startDate);
    const [endDateState, setEndDate] = useState(endDate);
    const [availableState, setIsAvailable] = useState(isAvailable);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = Array.isArray(routeImages) && routeImages.length
    ? routeImages.map(item => typeof item === 'string' ? { uri: item } : item)
    : [];


    const [userProfileImage, setUserProfileImage] = useState(null);

    const renderImageItem = ({ item, index }) => (
        <View
          style={{
            marginRight: imageSpacing,
            marginLeft: index === 0 ? imageSpacing : 0, // only the first image gets left margin
          }}
        >
          <Image source={item} style={[styles.carouselImage, { width: imageSize, height: imageSize }]} />
        </View>
      );
      
    const displayAddress = addressState ? addressState.split(',').slice(0, 3).join(',') : 'No address available';
    const street = addressState?.split(',')[0] || 'No address available';
    const cityState = addressState?.split(',').slice(1, 3).join(',') || '';

    const formatCostText = (cost, rentalPeriod = "hour") => {
        if (!cost) return "";
        const readablePeriod = rentalPeriod
            .replace("hr", "hour")
            .replace("semstr", "semester");
        return `$${parseFloat(cost).toFixed(2)}/${readablePeriod}`;
    };    

    const removeSpaces = (text) => {
        return text.replace(/\s/g, '');
    };

    useEffect(() => {
        if (ppHour) {
            setPrice(ppHour.substring(1, ppHour.indexOf('/') - 1));
            setRentalPeriod(ppHour.substring(ppHour.indexOf('/') + 1));
        }
        
        const fetchCurrentUser = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                setCurrentUserId(user.uid); // Set the logged-in user ID
            }
        };
        fetchCurrentUser();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
          if (postId) {
            console.log("Refreshing ListingScreen after save...");
            getPost(postId)
              .then((updatedPost) => {
                if (updatedPost) {
                  setAddress(updatedPost.location);
                
                    if (updatedPost.ppHour) {
                        setPrice(updatedPost.ppHour.substring(1, updatedPost.ppHour.indexOf('/') - 1));
                        setRentalPeriod(updatedPost.ppHour.substring(updatedPost.ppHour.indexOf('/') + 1));
                    }
                    
                  setStartDate(updatedPost.firstDate);
                  setEndDate(updatedPost.lastDate);
                  setIsAvailable(updatedPost.isAvailable);
                } else {
                  alert("Listing has been deleted.");
                  navigation.navigate("HomeScreen");
                }
              })
              .catch((error) => {
                console.error("Error fetching updated post:", error);
              });
          }
        }, [postId])
      );        

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
                    if (userData?.profileImage) {
                        setUserProfileImage(userData.profileImage);
                    }
                    
                    if (userData?.email) {
                        setUserEmail(userData.email);
                    } else {
                        console.warn("Email not found in userData");
                    }
        
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setFullName("User Name");
                }
            }
        };        
        
        const fetchPostData = async () => {
            if(postId){
                try {
                    const postData = await getPost(postId);
                    if (postData?.negotiable){
                        setIsNegotiable(postData.negotiable);
                    }
                } catch (error) {
                    console.error("Error fetching post data:", error);
                }
            }

        };

        fetchPostData();
        fetchUserData();
    }, [userID, postId]);
    
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

    const handleContactPress = () => {
        if (!userEmail) {
            alert("Email not available.");
            return;
        }
    
        const subject = `Inquiry about your parking listing`;
        const body = `Hi ${fullName || ''},\n\nI'm interested in your listing at ${displayAddress}. Could you please provide more details?\n\nThanks!`;
        const emailUrl = `mailto:${userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        Linking.openURL(emailUrl).catch(err => console.error('Error opening email client:', err));
    };    
    
    const handleSavePress = async () => {
        try {
            const savedListings = await AsyncStorage.getItem('savedListings');
            let savedListingsArray = savedListings ? JSON.parse(savedListings) : [];
    
            if (isSaved) {
                savedListingsArray = savedListingsArray.filter(item => item.postId !== postId);
            } else {
                savedListingsArray.push({
                    postId,
                    address: addressState,
                    // ppHour: ppHourState,
                    price: price,
                    rentalPeriod: rentalPeriod,
                    startDate: startDateState ? new Date(startDateState).toISOString() : null,
                    endDate: endDateState ? new Date(endDateState).toISOString() : null,
                    startTime: route.params?.startTime || null,
                    endTime: route.params?.endTime || null,     
                    isAvailable: availableState,
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
    const listedYear = startDateState ? new Date(startDateState).getFullYear() : "Invalid date";
    
    const isDefaultOnly = (imagesArray) => {
        if (imagesArray.length !== 1) return false;
      
        const firstImage = imagesArray[0];
      
        // Check if it's a remote image with 'image.png' in the URL (Firebase fallback)
        if (typeof firstImage === 'object' && firstImage.uri) {
          return firstImage.uri.includes('image.png');
        }
      
        // Check if it's a local static image (like `CarImage`)
        if (typeof firstImage === 'number') {
          return firstImage === CarImage;
        }
      
        return false;
      };
      
      
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
                        <View style={styles.addressContainer}>
                            <Text style={styles.listingHeading}>{street}</Text>
                            {cityState ? (
                                <Text style={styles.cityStateHeading}>{cityState.trim()}</Text>
                            ) : null}
                        </View>
                    </View>
                    {currentUserId === userID && (
                        <TouchableOpacity 
                            onPress={() => {
                                console.log("Navigating to EditListingScreen with postId:", postId);
                                navigation.navigate('EditListingScreen', { 
                                    postId, 
                                    userId: userID, 
                                    address, 
                                    ppHour: price, 
                                    startDate, 
                                    endDate, 
                                    isAvailable 
                                });
                            }}
                        >
                            <Text style={styles.editListingText}>Edit Listing</Text>
                        </TouchableOpacity>
                    )}
                    {images.length > 0 && !isDefaultOnly(images) && (
                        <View style={styles.carouselContainer}>
                        <FlatList
                            data={images}
                            renderItem={renderImageItem}
                            keyExtractor={(_, index) => index.toString()}
                            horizontal
                            pagingEnabled={false}
                            snapToInterval={imageSize + imageSpacing}
                            decelerationRate="fast"
                            showsHorizontalScrollIndicator={false}
                            onScroll={e => {
                                const index = Math.round(
                                    e.nativeEvent.contentOffset.x / (imageSize + imageSpacing)
                                );
                                setCurrentImageIndex(index);
                            }}
                            contentContainerStyle={{ paddingHorizontal: imageSpacing / 2 }}
                        />
                            <View style={styles.imageCounterOverlay}>
                                <Text style={styles.imageCounterText}>{currentImageIndex + 1}/{images.length}</Text>
                            </View>
                            <View style={styles.dotsContainer}>
                                {images.map((_, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.dot,
                                            currentImageIndex === index && styles.activeDot
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>
                    )}

                    <View style={styles.userInfoContainer}>
                        <Image
                            source={userProfileImage ? { uri: userProfileImage } : User}
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
                            {startDateState
                                ? `${new Date(startDateState).getMonth() + 1}/${new Date(startDateState).getDate() + 1}/${new Date(startDateState).getFullYear()}`
                                : "Invalid date"}{" "}
                                -{" "}
                            {getFormattedEndDate(startDateState, endDateState)}
                            </Text>
                        </View>
                        <Text style={[styles.infoLabels, { marginTop: 10 }]}>Cost:</Text>
                        <View style={styles.border}>
                            <Text style={styles.costText}>{formatCostText(price, rentalPeriod)}</Text>
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
                            <Text style={styles.boldCostText}>{removeSpaces(formatCostText(price, rentalPeriod))}</Text>
                            <Text style={styles.negotiableText}>{isNegotiable ? "Negotiable" : "Firm price"}</Text>
                        </View>
                        <TouchableOpacity onPress={handleContactPress}>
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
    addressContainer: {
        marginLeft: 22,
      },
      listingHeading: {
        fontSize: 24,
        fontFamily: 'NotoSansTaiTham-Bold',
        letterSpacing: -1,
      },
      cityStateHeading: {
        fontSize: 18,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginTop: "-2.5%",
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
        marginTop: "-2.5%",
        marginLeft: "3.5%",
    },
    carImagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: "3.5%",
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
        borderRadius: '100%',
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
    carouselContainer: {
        marginTop: '1.75%',
    },
    carouselImage: {
        borderRadius: 16,
    },
    imageCounterOverlay: {
        position: 'absolute',
        top: "3.5%",
        right: "4%",
        backgroundColor: 'rgba(102, 102, 102, 100)',
        borderRadius: 12.5,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    imageCounterText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham',
    },
    dotsContainer: {
        position: 'absolute',
        bottom: '3.5%',
        alignSelf: 'center',
        backgroundColor: 'rgba(102, 102, 102, 0.7)',
        borderRadius: 20,
        width: 97,
        height: 26,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 20,
        backgroundColor: '#E9EEF1',
        marginHorizontal: "5%",
    },
    activeDot: {
        backgroundColor: '#FED869',
    }    
});

export default ListingScreen;
