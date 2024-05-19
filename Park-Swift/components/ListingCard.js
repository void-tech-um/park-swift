import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Listing from "../screens/listing";

//listing card component that displays the listing
const ListingCard = ({ address, date, startTime, endTime, image, ppHour, listingURL }) => {
    const navigation = useNavigation();

    const handleSeeMorePress = () => {
        navigation.navigate('Listing', { Listing });
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.topSection}>
                    <Text style={styles.address}>{address}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: 'https://d9lvjui2ux1xa.cloudfront.net/img/topic/header_images/parking-spaces-lg.jpg'}}
                        style={styles.image}
                    />
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.content}>
                        <Text style={styles.price}>{ppHour}</Text>
                        <Text style={styles.description}>10 minutes away</Text>
                        <Text style={styles.description}>{date}</Text>
                        <Text style={styles.description}>{startTime} - {endTime}</Text>
                    </View>
                    <TouchableOpacity onPress={handleSeeMorePress} style={styles.button}>
                        <Text style={styles.buttonText}>→</Text>
                    </TouchableOpacity>
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
        padding: 10,
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
    bottomSection: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#052658",
        flex: 1,
        marginLeft: 110,
    },
    content: {
        flex: 1,
        paddingHorizontal: 14,
        justifyContent: "center",
    },
    address: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    price: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FED869',
    },
    description: {
        fontSize: 14,
        color: '#EEEBDB',
    },
    button: {
        backgroundColor: '#0653A1',
        borderRadius: 17,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
        alignSelf: 'center',
        marginRight: 15,
    },
    buttonText: {
        color: '#FFFFF0',
        fontSize: 25,
    },
});

export default ListingCard;
