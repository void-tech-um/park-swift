import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostConfirmationScreen from './screens/PostConfirmationScreen.js';
import NavBar from './components/NavBar.js';
import LoginScreen from './screens/LoginScreen.js';
import RegistrationScreen from './screens/RegistrationScreen.js';
import ListingScreen from './screens/ListingScreen.js';
//import { app, analytics, auth, database } from './services/config';
//import { ref, set } from 'firebase/database';

import postScreen from './screens/postScreen';
import FilterScreen from './screens/FilterScreen.js';
import EditProfileScreen from './screens/EditProfileScreen.js';

const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

function App({route}){
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  
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



