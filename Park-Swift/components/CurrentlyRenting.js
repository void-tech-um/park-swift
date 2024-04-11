import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

//import the relevant variables and stuff


const CurrentlyRentingCard = () => {
   return (
       <View style={styles.container}>
           <View style={styles.titleContainer}>
               <Text style={styles.title}>Currently</Text>
               <Text style={styles.title}>Renting:</Text>
           </View>
           <View style={styles.addressContainer}>
               <Text style={styles.address}>143 S Division St</Text>
               <Text style={styles.moreInfo}>Click to see more info</Text>
           </View>
       </View>
   );
};


const styles = StyleSheet.create({
    container: {
        height: windowHeight * 0.13, // 13% of the window's height
        width: '95%',
        backgroundColor: '#BEBEBE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        alignSelf: 'center',
    },
   titleContainer: {
       flexDirection: 'column',
   },
   title: {
       fontSize: 25,
       fontWeight: 'bold',
       color: 'black',
   },
   addressContainer: {
       backgroundColor: '#404040',
       padding: 10,
       borderRadius: 10,
       width: '65%',
       height: '75%',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
   },
   address: {
       color: 'white',
       fontSize: 17,
       fontWeight: 'bold',
       textAlign: 'center',
   },
   moreInfo: {
       color: 'white',
       fontSize: 17,
       marginTop: 5,
       textAlign: 'center',
   },
});


export default CurrentlyRentingCard;



