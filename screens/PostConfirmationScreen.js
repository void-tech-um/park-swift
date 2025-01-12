import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const PostConfirmationScreen = () => {
  const navigation = useNavigation();

  const handleListAnother = () => {
    // Navigate to PostScreen as a new screen
    navigation.navigate('List Your Space');
  };

  const handleReturnHome = () => {
    // Navigate back to HomeScreen
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>Thank You!</Text>
      <Text style={styles.additionalText}>Your listing has been posted.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleListAnother}
      >
        <Text style={styles.buttonText}>List another</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleReturnHome}
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
    fontSize: 25,
    fontFamily: "NotoSansTaiTham-Bold",
  },
  additionalText: {
    fontSize: 25,
    fontFamily: "NotoSansTaiTham-Bold",
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    borderRadius: 20, 
    width: 400, 
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0653A1",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "NotoSansTaiTham-Bold",
    color: "white",
  },
});

export default PostConfirmationScreen;
