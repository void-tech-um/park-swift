import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Back from '../assets/Back.png'; 
import User from '../assets/profile.png';
import FitsAllModels from '../assets/FitsAllModels.png'; 
import WeatherProtected from '../assets/WeatherProtected.png'; 
import PavedEntrance from '../assets/PavedEntrance.png'; 
import PrivateProperty from '../assets/PrivateProperty.png';  
import Save from '../assets/Save.png'; 
import CarImage from '../assets/CarImage.png'; 
import MenuSearchBar from './MenuSearchBar';

const { width, height } = Dimensions.get('window');

const ListingScreen = ({ route }) => {
    const navigation = useNavigation();
    const { address, ppHour, myUser } = route.params;

    const handleBackPress = () => {
        navigation.goBack();
    };

    const displayAddress = address.split(',')[0];

    const formatCostText = (cost) => {
        if (cost.includes('hr')) {
            return cost.replace('hr', 'hour');
        } else if (cost.includes('sem')) {
            return cost.replace('sem', 'semester');
        }
        return cost;
    };

    const removeSpaces = (text) => {
        return text.replace(/\s/g, '');
    };

    const fullName = myUser?.fullName || "First Last";
    const [firstName, lastName] = fullName.split(' ');

    const getImageMargins = () => {
        if (width > 447) {
            return {
                firstImageMarginLeft: '-0.20%',
                secondImageMarginLeft:'-5%',
            };
        }if ((width === 432 && height === 840)) {
            return {
                firstImageMarginLeft: '3.6%',
                secondImageMarginLeft: '2.%',
            };
        }else if (width > 411){
            return {
                firstImageMarginLeft: '8.9%',
                secondImageMarginLeft: '12.4%',
            };
        }else if(width > 392){
            return {
                firstImageMarginLeft: '14.%',
                secondImageMarginLeft: '22.4%',
            };
        }
        else{
            return {
                firstImageMarginLeft: '8%',
                secondImageMarginLeft: '11%',
            };
        }
    };

    const backButtonMarginLeft = () => {
        if(width > 447){
            return 2.8;
        }if ((width === 432 && height === 840)) {
            return 2.5;
        }else if(width > 411){
            return 2.7;  
        }else if(width > 392){
            return 2.7;
        }
        else{
            return 0;
        }
    };

    const textContactSpacing = () => {
        if(width > 447){
            return -3;
        }if ((width === 432 && height === 840)) {
            return -1.8;
        }else if(width > 411){
            return 0;
        }else if(width > 392){
            return 1.6;
        }else{
            return 0;
        }
    };
    const { firstImageMarginLeft, secondImageMarginLeft } = getImageMargins();
    const backMarginLeft = backButtonMarginLeft();
    const textSpacing = textContactSpacing();

    return (
        <View style={styles.container}>
            <MenuSearchBar showSearchBar={false} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleBackPress}>
                            <Image
                                source={Back}
                                style={[styles.Back, { marginLeft: backMarginLeft}]}
                            />
                        </TouchableOpacity>
                        <Text style={styles.listingHeading}>{displayAddress}</Text>
                    </View>
                    <View style={styles.carImagesContainer}>
                        <Image
                            source={CarImage}
                            style={[styles.FirstImage, { marginLeft: firstImageMarginLeft }]}
                        />
                        <Image
                            source={CarImage}
                            style={[styles.SecondImage, { marginLeft: secondImageMarginLeft }]}
                        />
                    </View>
                    <View style={styles.userInfoContainer}>
                        <Image
                            source={User}
                            style={styles.UserImage}
                        />
                        <View style={styles.userInfoTextContainer}>
                            <Text style={styles.listedUser}>Listed by {firstName} {lastName}</Text>
                            <Text style={styles.listingDate}>Listing since 2024</Text>
                        </View>
                    </View>
                    <View style={styles.iconRow}>
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
                    </View>

                    <View style={styles.listingInfoSection}>
                        <Text style={styles.listingInfo}>Listing Information</Text>
                        <Text style={styles.infoLabels}>Available from:</Text>
                        <View style={styles.border}>
                            <Text style={styles.dateText}>8/29/23 - 05/02/24</Text>
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
                            <Text style={[styles.boldCostText, { marginLeft: textSpacing }]}>{removeSpaces(formatCostText(ppHour))}</Text>
                            <Text style={[styles.negotiableText, { marginLeft: textSpacing }]}>Negotiable</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.contactButton}>
                                <Text style={styles.contactText}>Contact</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={Save}
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
        fontSize: 16,
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