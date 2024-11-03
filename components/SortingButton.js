import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FilterScreen from '../screens/FilterScreen';
import Filter from '../assets/Filter.png';
const SortingButton = () => {
    const navigation = useNavigation();


    const handlePress = () => {
      console.log('Button pressed');
      navigation.navigate('FilterScreen', { FilterScreen });
    };
  
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={handlePress}>
              <Image
                  source={Filter}
                  style={styles.filterImage}
              />
          </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  filterImage: {
      width: 153, 
      height: 41, 
  },
});

export default SortingButton;