import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import arrow from '../assets/arrow.png'; 
import SavedIcon from '../assets/Vector.png';
import Car from '../assets/car.png'; 
import UnavailableBadge from '../components/Unavailable'; 

const ListingCard = ({ id, userID, address, date, startTime, endTime, image, ppHour, listingURL, isAvailable=true, showSavedIcon}) => {
    const navigation = useNavigation();

    const handleSeeMorePress = () => {
        navigation.navigate('Listing', { 
            id, 
            userID,
            address, 
            date,
            ppHour, 
            listingURL, 
            startTime, 
            endTime,
            isAvailable,
            showSavedIcon,
        });
    };

    return (
        <TouchableOpacity onPress={handleSeeMorePress}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.topSection}>
                        <Text style={styles.address}>{address}</Text>
                        {showSavedIcon && (
                            <Image
                                source={SavedIcon}
                                style={styles.savedIcon}
                            />
                        )}
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={Car}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.bottomSection}>
                        <View style={styles.content}>
                            <Text style={styles.price}>{ppHour}</Text>
                            <Text style={styles.description}>x minutes away</Text>
                            {date ? <Text style={styles.description}>{date}</Text> : null}
                            {startTime && endTime && (
                                <Text style={styles.description}>{startTime} - {endTime}</Text>
                            )}
                        </View>
                        {!isAvailable && <UnavailableBadge />}
                        {isAvailable && (
                            <TouchableOpacity onPress={handleSeeMorePress}>
                                <Image
                                    source={arrow}
                                    style={styles.button}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#052658",
        borderRadius: 20,
        marginVertical: 7,
        overflow: 'hidden',
        width: '90%',
        height: 165,
        position: 'relative',
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
    },
    topSection: {
        backgroundColor: '#EEEBDB',
        padding: 9,
        alignItems: 'center',
        zIndex: 1,
    },
    imageContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 110,
        zIndex: 0,
        overflow: 'hidden',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    savedIcon: {
        position: 'absolute',
        left: 15,
        top: 18.5,
        width: 30,
        height: 45,
        zIndex: 2,
    },
    bottomSection: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#052658",
        flex: 1,
        marginLeft: 110,
        position: 'relative',
    },
    content: {
        flex: 1,
        paddingHorizontal: 14,
        justifyContent: "flex-start",
        marginTop: Platform.OS === 'ios' ? '5%' : '3%',
    },
    address: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FED869',
    },
    description: {
        fontSize: 14,
        color: '#EEEBDB',
    },
    button: {
        backgroundColor: '#0653A1',
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 55,
        marginRight: 15,
        marginTop: 28.5,
    },
    unavailableBadge: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export default ListingCard;
