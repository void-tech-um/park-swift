import React from 'react';
import { SafeAreaView } from 'react-native';
import AddressMapping from './addressmapping';
import SizeBox from './size.js'
import DateBox from './datebox.js'
import PriceBox from './pricebox.js'

// assume API returns an object with the structure { imageUrl: 'URL_TO_IMAGE', caption: 'IMAGE_CAPTION' }.

// const PriceBox = () => {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.label}> Price </Text>
//         {/* Your content goes here */}
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//       container: {
//         borderWidth: 1,
//         borderColor: 'black',
//         padding: 10,
//         marginBottom: 10,
//       },
//       label: {
//         fontWeight: 'bold',
//         marginBottom: 5,
//       },
//     });


const ListingInfoPage = () => {
    return (
      <SafeAreaView>
        <AddressMapping/>
        <PriceBox/>
        <SizeBox/>
        <DateBox/>
    </SafeAreaView>
    );
  };
  
export default ListingInfoPage;