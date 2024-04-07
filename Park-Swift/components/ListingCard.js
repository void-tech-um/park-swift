import * as React from "react";

import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";


//listing card component that displays the listing
const ListingCard = ({post}) => {
    //take in data from backend
    
    return (
        <View style={styles.container}>
            {/* //update and display specific info variables
            //1. price per hour
            //2. address
            //3. date
            //4. start time
            //5. end time
            //contact button */}
            <TouchableOpacity>
                <Text style={styles.button}>Hi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        height: "33%",
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
    },
    image: {
        height: "33%",
        width: "100%",
    },
    infoContainer: {
        height: "33%",
        width: "100%",
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
    banner: {

    },
});

export default ListingCard;
