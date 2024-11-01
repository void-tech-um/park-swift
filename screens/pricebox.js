import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// const DualPriceBoxes = () => {
//   return (
//     <View style={styles.container}>
//       <PriceBox caption="Price 1" priceText="500 negotiable" />
//       <PriceBox caption="Price 2" priceText="700 fixed" />
//     </View>
//   );
// };

// const PriceBox = ({ caption, priceText }) => {
//   return (
//     <View style={styles.boxContainer}>
//       <Text style={styles.caption}>{caption}</Text>
//       <View style={styles.box}>
//         <Text style={styles.priceText}>{priceText}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   boxContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   caption: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   box: {
//     backgroundColor: '#ddd',
//     padding: 10,
//     borderRadius: 8,
//   },
//   priceText: {
//     color: '#333',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default DualPriceBoxes;

// const PriceBox = ({ caption, priceText }) => {
//   return (
//     <View style={styles.boxContainer}>
//       <Text style={styles.caption}>{caption}</Text>
//       <View style={styles.box}>
//         <Text style={styles.priceText}>{priceText}</Text>
//       </View>
//     </View>
//   );
// };









// old price boxing
const PriceBox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Price</Text>
      <View style={styles.box}>
        <Text style={styles.priceText}>500 negotiable</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  caption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  box: {
    backgroundColor: '#ddd', // Grey background color
    padding: 10,
    borderRadius: 8,
  },
  priceText: {
    color: '#333', // Dark text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PriceBox;