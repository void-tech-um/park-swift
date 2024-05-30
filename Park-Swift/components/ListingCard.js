import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Listing from "../screens/listing";
import UnavailableBadge from "../components/Unavailable.js";
import SavedIcon from '../assets/Vector.png'; 
import Car from '../assets/car.png'; 
import arrow from '../assets/arrow.png'; 
//listing card component that displays the listing
const ListingCard = ({ address, date, startTime, endTime, image, ppHour, listingURL, isAvailable = true, showSavedIcon = false }) => {
    const navigation = useNavigation();

    const handleSeeMorePress = () => {
        navigation.navigate('Listing', { Listing });
    };

    return (
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
                        source={ Car }
                        style={styles.image}
                    />
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.content}>
                        <Text style={styles.price}>{ppHour}</Text>
                        <Text style={styles.description}>10 minutes away</Text>
                        <Text style={styles.description}>{date}</Text>
                        {startTime && endTime && (
                            <Text style={styles.description}>{startTime} - {endTime}</Text>
                        )}
                    </View>
                    {!isAvailable && <UnavailableBadge style={styles.unavailableBadge} />}
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
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#052658",
        borderRadius: 20,
        marginVertical: 7,
        marginHorizontal: 20,
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
        zIndex: 1, // Ensure this is above the image
    },
    imageContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 110,
        zIndex: 0, // Ensure this is below the top section
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
        position: 'relative', // Added to ensure children with absolute positioning are relative to this section
    },
    content: {
        flex: 1,
        paddingHorizontal: 14,
        justifyContent: "flex-start",
        marginTop: 12.5,
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