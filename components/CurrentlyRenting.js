import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const CurrentlyRentingCard = () => {
   return (
       <View style={styles.container}>
           <View style={styles.centeredContainer}>
               <View>
                   <Text style={[styles.title, { marginBottom: -4 }]}>Currently</Text>
                   <Text style={styles.title}>Renting:</Text>
               </View>
               <View style={styles.addressContainer}>
                   <Text style={styles.address}>143 S Division St</Text>
                   <Text style={styles.moreInfo}>Click to see more info</Text>
               </View>
           </View>
       </View>
   );
};

const styles = StyleSheet.create({
    container: {
        height: windowHeight * 0.11,
        width: '100%',
        backgroundColor: '#EEEBDB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.8%',
    },
    centeredContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    addressContainer: {
        backgroundColor: '#0653A1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        width: '55%',
        height: '100%',
        marginLeft: 40,
    },
    address: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "NotoSansTaiTham-Regular"
    },
    moreInfo: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        marginTop: -8,
        fontFamily: "NotoSansTaiTham-Regular"
    },
});

export default CurrentlyRentingCard;