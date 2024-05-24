import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import FilterScreen from '../screens/FilterScreen';

const SortingButton = () => {
    const navigation = useNavigation();


    const handlePress = () => {
      // Placeholder for future functionality
      console.log('Button pressed');
      navigation.navigate('FilterScreen', { FilterScreen });
    };
  
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="tune" size={20} color="white" />
              <Text style={styles.buttonText}>  Filter & Sort</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#0653A1',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 17,
      marginRight: 2.5,
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
    },
  });
  
  export default SortingButton;