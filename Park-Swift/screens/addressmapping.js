// import { View, Text, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-elements';

const AddressMapping = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Address 123</Text>
      <Image
        style={styles.image}
        source={{ uri: 'https://placekitten.com/200/300' }} // Replace with your image source
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  caption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    resizeMode: 'cover', // or 'contain' based on your preference
    borderRadius: 8, // Optional: Add border radius for a rounded appearance
  },
});



// use this with actual image data
// const AddressMapping = () => {
//   const [imageData, setImageData] = useState(null);

//   useEffect(() => {
//     // this API endpoint will pull in the address listing location image
//     axios.get('YOUR_API_ENDPOINT')
//       .then(response => {
//         setImageData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching image data:', error);
//       });
//   }, []);

//   return (
//     <View>
//       <Card>
//         {imageData && (
//           <Image
//             source={{ uri: imageData.imageUrl }}
//             style={{ width: '100%', height: 200 }}
//           />
//         )}
//         <Text style={{ fontSize: 18, marginTop: 10, textAlign: 'center' }}>
//           {imageData ? imageData.caption : 'Loading...'}
//         </Text>
//         <Text style={{ fontSize: 18, marginTop: 10, textAlign: 'center' }}>
//           Size
//         </Text>
//         <Text style={{ fontSize: 18, marginTop: 10, textAlign: 'center' }}>
//           Date
//         </Text>
//       </Card>
//     </View>
//   );
// };

export default AddressMapping;


