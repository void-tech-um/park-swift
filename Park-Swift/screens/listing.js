import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {getPost}  from '../firebaseFunctions/firebase';
import { useNavigation } from '@react-navigation/native';

const Listing = () => {

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const [myPost, setMyPost] = useState(null);

    useEffect(() => {
        getPost('-NtTXKQDyThU0CC3KLd_')
            .then((postData) => {
                setMyPost(postData);
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
            });
    }, []);
    
    if (!myPost) {
        return <Text>Loading...</Text>;
    }
    if(myPost.negotiable == 1){
        negotiableVar = "Negotiable"; 
    }else{
        negotiableVar = "Fixed"
    }
   return (
    <View style={styles.container}>
      {/* Add the grey heading with the menu 3 line thing above the Listing heading */}
      {/* Listing Heading */}
      <View style={styles.topHeader}></View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={40} color="black" />
        </TouchableOpacity>
        <Text style = {styles.listingHeading}>{myPost.location}</Text>
      </View>

      {/* Image Placeholder */}
      <Image
        source={{
          uri: "https://d9lvjui2ux1xa.cloudfront.net/img/topic/header_images/parking-spaces-lg.jpg",
        }}
        style={styles.listingImagesPlaceholder}
      />

      {/* Info Section */}
      <View style={styles.listingInfoSection}>
        <Text style={styles.sectionLabels}>Basic Info</Text>

        <Text style={styles.infoLabels}>Price</Text>
        <View style={styles.infoSection}>
            <Text style = {styles.infoContent}>${myPost.price}/{myPost.rentalPeriod} {negotiableVar}</Text>
        </View>

        <Text style={styles.infoLabels}>Size</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoContent}>Small</Text>
        </View>

        <Text style={styles.infoLabels}>Date</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoContent}>{myPost.firstDate} - {myPost.lastDate}</Text>
        </View>
        <Text style={styles.sectionLabels}>Description</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        height:"100%", // white background for whole page
    },
    topHeader: {
        flexDirection: 'row',
        backgroundColor: '#333', // dark grey background for top header
        padding: 10,
        height: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF', // dark grey background
        padding: 10,
    },
    listingHeading: {
        marginLeft: 8, // space between arrow and address title
        fontSize: 30,
        fontWeight: 'bold',
    },
    listingImagesPlaceholder: {
        left: 20,
        width: '100%',
        height: 200,
        backgroundColor: '#ccc',
    },
    sectionLabels: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 15,
    },
    listingInfoSection: {
        padding: 15,
    },
    infoLabels: {
        fontSize: 10,
        marginTop: 10,
    },
    infoContent: {
        fontSize: 15,
    },
    infoSection: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between', //not sure how this works chat told me it would make it spaced like the wireframe
        marginBottom: 8,
        padding: 8, // padding inside the grey box
        backgroundColor: '#ccc',
        borderRadius: 5, // rounded corners for the boxes
      },

})

export default Listing;
