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
                <Text style={styles.description}>{ppHour}</Text>
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
        height: 200,
        width: "120%",
        backgroundColor: "#D9D9D9",
        marginBottom: "5%",
    },
    bannerContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderTopWidth: 40,
        borderTopColor: '#ffffff',
        borderLeftWidth: 40,
        borderLeftColor: 'transparent',
    },
    banner: {
        // position: 'absolute',
        // top: 0,
        // right: 0,
        // width: 0,
        // height: 0,
        // borderTopWidth: 40,
        // borderTopColor: 'red', // Change color as needed
        // borderLeftWidth: 40,
        // borderLeftColor: 'transparent',
        // zIndex: 1,
        height: "100%",
        width: "33%",
        backgroundColor: "#888888",
    },
    buttonText: {
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
        color: "white",
    },
    buttonBox: {
        alignItems: "center",
        padding: 10,
        margin: "10%",
        justifyContent: "center",
        borderRadius: 30, // Adjust to make it more oval-shaped
        backgroundColor: '#464646',
    },
    image: {
        width: '33%',
        height: '100%',
        resizeMode: 'cover', // or 'cover' depending on requirement
        //borderRadius: 8,
        //marginRight: "1%",
    },
    button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    content: {
        flex: 1,
        padding: "3%",
        flexGrow: "2",
        // width: "10%",
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
