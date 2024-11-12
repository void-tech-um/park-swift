import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './screens/HomeScreen.js';
import PostConfirmationScreen from './screens/PostConfirmationScreen.js';
import NavBar from './components/NavBar.js';
import LoginScreen from './screens/LoginScreen.js';
import RegistrationScreen from './screens/RegistrationScreen.js';
import ListingScreen from './screens/ListingScreen.js';
import FilterScreen from './screens/FilterScreen.js';
import EditProfileScreen from './screens/EditProfileScreen.js';

const Stack = createStackNavigator();

const loadFonts = () => {
  return Font.loadAsync({
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
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Tab" component={NavBar} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="PostConfirmationScreen" component={PostConfirmationScreen} options={{headerStyle: {backgroundColor: '#959595', height:'12%'},}}/>
        <Stack.Screen name="Listing" component={ListingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;