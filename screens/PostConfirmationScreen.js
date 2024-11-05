import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const PostConfirmationScreen = () => {
  const navigation = useNavigation();
  const handleButtonPress1 = () => {
    // Add your code for the first button press here
    navigation.navigate('List Your Space');
  };

  const handleButtonPress2 = () => {
    // Add your code for the second button press here
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>Thank You!</Text>
      <Text style={styles.additionalText}>Your listing has been posted.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress1}
      >
        <Text style={styles.buttonText}>Continue listing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress2}
      >
        <Text style={styles.buttonText}>Return back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  thankYouText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  additionalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#D3D3D3',
    padding: 13,
    borderRadius: 17, 
    width: 340, 
    alignItems: 'center', 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostConfirmationScreen;
