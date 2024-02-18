import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './screens/LoginScreen.js';
import RegistrationScreen from './screens/RegistrationScreen.js';
import CurrentTile from './screens/home';
import SearchBar from './screens/search';
import RecentlyVisitedProfiles from './screens/recentlyVisitedProfiles.js';
import Listing from './screens/listing.js';
import ProfileDetail from './screens/profile';
import ListingInfoPage from './screens/listinginfopage.js';
import ThankYouScreen from './screens/confirmation.js';
import { Image, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavBar from './components/NavBar.js';
import { app, analytics, auth, database } from './services/config';
import { ref, set } from 'firebase/database';
//import {decode, encode} from 'base-64'
//if (!global.btoa) {  global.btoa = encode }
//if (!global.atob) { global.atob = decode }

import ListYourSpaceScreen from './screens/ListYourSpaceScreen';


const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* TODO: LoginScreen AND RegistrationScreen COMMENTED OUT FOR DISABLING LOGIN DURING DEVELOPMENT */}
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="Registration" component={RegistrationScreen} /> */}
        <Stack.Screen name="Tab" component={NavBar} />
           {/* {props => <HomeScreen {...props} extraData={user} />}  */}
        {/* </Stack.Screen> */}
        <Stack.Screen name="ThankYou" component={ThankYouScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// //Search Bar





// // creating box component



