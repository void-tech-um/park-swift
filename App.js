import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import PostConfirmationScreen from './screens/PostConfirmationScreen.js';
import NavBar from './components/NavBar.js';
import LoginScreen from './screens/LoginScreen.js';
import RegistrationScreen from './screens/RegistrationScreen.js';
import ListingScreen from './screens/ListingScreen.js';
import PostScreen from './screens/PostScreen.js';
import FilterScreen from './screens/FilterScreen.js';
import EditProfileScreen from './screens/EditProfileScreen.js';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const loadFonts = () => {
  return Font.loadAsync({
    'NotoSansTaiTham-Bold': require('./assets/fonts/NotoSansTaiTham-Bold.ttf'),
    'NotoSansTaiTham-Medium': require('./assets/fonts/NotoSansTaiTham-Medium.ttf'),
    'NotoSansTaiTham-Regular': require('./assets/fonts/NotoSansTaiTham-Regular.ttf'),
    'NotoSansTaiTham-SemiBold': require('./assets/fonts/NotoSansTaiTham-SemiBold.ttf'),
    'NotoSansTaiTham-Variable': require('./assets/fonts/NotoSansTaiTham-VariableFont_wght.ttf'),
  });
};

function App({ route }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null; // Render nothing while loading
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* TODO: LoginScreen AND RegistrationScreen COMMENTED OUT FOR DISABLING LOGIN DURING DEVELOPMENT */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Tab" component={NavBar} options={{ headerShown: false }}/>
        <Stack.Screen name="PostConfirmationScreen" component={PostConfirmationScreen} options={{headerStyle: {backgroundColor: '#959595', height:'12%'},}}/>
        <Stack.Screen name="ListingScreen" component={ListingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// //Search Bar





// // creating box component



