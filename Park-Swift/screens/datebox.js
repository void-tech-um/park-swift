import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateBox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}> Date </Text>
      <View style={styles.box}>
        <Text style={styles.priceText}> 8/29/23- 5/02/24 </Text>
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

export default DateBox;