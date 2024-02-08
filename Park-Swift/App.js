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
import Listing from './screens/listing.js';
import ProfileDetail from './screens/profile';
import ListingInfoPage from './screens/listinginfopage.js';
import ThankYouScreen from './screens/confirmation.js';
import { Image, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { app, analytics, auth, database } from './services/config';
import { ref, set } from 'firebase/database';
//import {decode, encode} from 'base-64'
//if (!global.btoa) {  global.btoa = encode }
//if (!global.atob) { global.atob = decode }

import ListYourSpaceScreen from './screens/ListYourSpaceScreen';


const Stack = createStackNavigator();



const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  // adding currentTile and search bar components

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <React.Fragment>
        <SearchBar/>
        <CurrentTile/>
      </React.Fragment>
    </View>
  );
}

function MapScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Map Screen</Text>
    </View>
  );
}


function MessagesScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Messages Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ProfileDetail/>
    </View>
  );
}

function TabNav() {
  return (
    
      <Tab.Navigator initialRouteName="HomeScreen"
      tabBarPosition="bottom"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="ListYourSpaceScreen" component={ListYourSpaceScreen} />
        <Tab.Screen name="testing_listing_info" component={ListingInfoPage} />
        <Tab.Screen name="ThankYouScreen" component={ThankYouScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />

        <Tab.Screen name="Listing" component={Listing} />
      </Tab.Navigator>
    
  );
}

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* TODO: 104 AND 105 COMMENTED OUT FOR DISABLING LOGIN DURING DEVELOPMENT */}
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="Registration" component={RegistrationScreen} /> */}
        <Stack.Screen name="Tab" component={TabNav} />
           {/* {props => <HomeScreen {...props} extraData={user} />}  */}
        {/* </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// //Search Bar





// // creating box component



