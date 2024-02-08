import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const SortingButton = () => {
    const handlePress = () => {
      // Placeholder for future functionality
      console.log('Button pressed');
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