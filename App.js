import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './screens/HomeScreen.js';
import PostConfirmationScreen from './screens/PostConfirmationScreen.js';
import PostScreen from './screens/PostScreen.js';
import NavBar from './components/NavBar.js';
import LaunchScreen from './screens/LaunchScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.js';
import CreateAccountScreen from './screens/CreateAccountScreen.js';
import ResetConfirmationScreen from './screens/ResetConfirmationScreen.js';
import ListingScreen from './screens/ListingScreen.js';
import FilterScreen from './screens/FilterScreen.js';
import EditProfileScreen from './screens/EditProfileScreen.js';
import EditListingScreen from './screens/EditListingScreen.js';
import MapScreen from './screens/MapScreen.js';
const Stack = createStackNavigator();

const loadFontsAndAssets = async () => {
  await Font.loadAsync({
        'NotoSansTaiTham-Bold': require('./assets/fonts/NotoSansTaiTham-Bold.ttf'),
        'NotoSansTaiTham-Medium': require('./assets/fonts/NotoSansTaiTham-Medium.ttf'),
        'NotoSansTaiTham-Regular': require('./assets/fonts/NotoSansTaiTham-Regular.ttf'),
        'NotoSansTaiTham-SemiBold': require('./assets/fonts/NotoSansTaiTham-SemiBold.ttf'),
        'NotoSansTaiTham-Variable': require('./assets/fonts/NotoSansTaiTham-VariableFont_wght.ttf'),
      });
};

SplashScreen.preventAutoHideAsync();

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareResources = async () => {
      try {
        await loadFontsAndAssets();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };
    prepareResources();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('./assets/shuttle.png')} style={styles.loadingImage} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator lazy={true}>
          <Stack.Screen name="LauchScreen" component={LaunchScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="ResetConfirmationScreen" component={ResetConfirmationScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Tab" component={NavBar} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false}} />
          <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PostConfirmationScreen" component={PostConfirmationScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Listing" component={ListingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditListingScreen" component={EditListingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  loadingImage: {
    width: 350, 
    height: 350, 
    resizeMode: 'contain',
  },
});

export default App;