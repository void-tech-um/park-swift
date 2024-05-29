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
        height: windowHeight * 0.11, 
        width: '100%',
        backgroundColor: '#EEEBDB',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
   titleContainer: {
    marginLeft: 27,
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
       height: '80%',
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



