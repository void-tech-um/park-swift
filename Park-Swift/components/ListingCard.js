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
            <Image
                    source={{uri: 'https://d9lvjui2ux1xa.cloudfront.net/img/topic/header_images/parking-spaces-lg.jpg'}}
                    style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.description}>time away from you</Text>
                <Text style={styles.description}>{date}</Text>
                <Text style={styles.description}>{startTime} - {endTime}</Text>
                <TouchableOpacity onPress={handleSeeMorePress}>
                    <View style={styles.buttonBox}>
                        <Text style={styles.buttonText}>See More</Text>   
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>{ppHour}</Text>
            </View>

            {/* <View style={styles.bannerContainer}>
                
            </View> */}
            
            
            
            {/* <View style={styles.imageContainer}>
                <Image
                    source={{uri: 'https://d9lvjui2ux1xa.cloudfront.net/img/topic/header_images/parking-spaces-lg.jpg'}}
                    style={styles.image}
                />
            </View> */}
            {/* //update and display specific info variables
            //1. price per hour
            //2. address
            //3. date
            //4. start time
            //5. end time
            //contact button */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "25%",
        width: "80%",
        backgroundColor: "#D9D9D9",
        marginBottom: "5%",
        marginLeft: "3.5%",
    },
    banner: {
        alignItems: "center",
        flexGrow: 1,
        height: "100%",
        width: "33%",
        backgroundColor: "#888888",
    },
    bannerText: {
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
        color: "white",
        fontSize: 16,
        alignItems: "stretch",
    },
    buttonText: {
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: "stretch",
    },
    buttonBox: {
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        marginTop: 20,
        borderRadius: 30, // Adjust to make it more oval-shaped
        backgroundColor: '#464646',
    },
    image: {
        flexGrow: 1,
        width: '33%',
        height: '100%',
        resizeMode: 'cover', // or 'cover' depending on requirement
        //borderRadius: 8,
        //marginRight: "5%",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        padding: "3%",
        flexGrow: 2,
        width: "50%",
    },
    address: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        
    },
});

export default ListingCard;
