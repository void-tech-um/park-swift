import * as React from "react";

import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Listing from "../screens/listing";

//listing card component that displays the listing
const ListingCard = ({address, date, startTime, endTime, image, ppHour, listingURL}) => {
    //take in data from backend

    const navigation = useNavigation();

    const handleSeeMorePress = () => {
        navigation.navigate('Listing', { Listing });
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{uri: 'https://d9lvjui2ux1xa.cloudfront.net/img/topic/header_images/parking-spaces-lg.jpg'}}
                    style={styles.image}
                />
            </View>
            {/* //update and display specific info variables
            //1. price per hour
            //2. address
            //3. date
            //4. start time
            //5. end time
            //contact button */}
            <TouchableOpacity onPress={handleSeeMorePress}>
                <Text style={styles.button}>See More</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        height: "50%",
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
    },
    infoContainer: {
        height: "100%",
        width: "60%",
        backgroundColor: "gray",
    },
    bannerContainer: {
        height: "33%",
        width: "100%",
    },
    address: {

    },
    button: {
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
    },
    imageContainer: {
        height: "100%",
        width: "40%",
        marginBottom: 20,
        paddingRight: '5%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // or 'cover' depending on requirement
    },
    button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    banner: {

    },
});

export default ListingCard;
