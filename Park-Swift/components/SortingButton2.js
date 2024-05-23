import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterScreen from '../screens/filter';



const SortingButton = () => {

  // Initialize navigation object
  const navigation = useNavigation();

    const handlePress = () => {
      // Navigate to another screen when the button is pressed
      navigation.navigate(FilterScreen);
    };

    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.buttonText}>Sort By     </Text>
              <Icon name="tune" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    button: {
      backgroundColor: '#D9D9D9',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: 'black',
    },
    buttonText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
  export default SortingButton;