import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// import { LoginScreen, HomeScreen, RegistrationScreen } from './screens'

import { StyleSheet, Text, View } from 'react-native';

// In App.js in a new project
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CurrentTile from './screens/home';
import SearchBar from './screens/search';
import Listing from './screens/listing.js';
import ProfileDetail from './screens/profile';
import ListingInfoPage from './screens/listinginfopage.js';
import ThankYouScreen from './screens/confirmation.js';
import { Image, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

// uncomment this when building around firebase auth fail
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HomeScreen"
      tabBarPosition="bottom"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="LoginScreen" component={LoginScreen} />
        <Tab.Screen name="ListYourSpaceScreen" component={ListYourSpaceScreen} />
        <Tab.Screen name="testing_listing_info" component={ListingInfoPage} />
        <Tab.Screen name="ThankYouScreen" component={ThankYouScreen} />
        <Tab.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />

        <Tab.Screen name="Listing" component={Listing} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  //height: Platform.OS === 'ios' ? 200 : 100, // example of platform specific styling!
                                             // do more of this!
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// //Search Bar





// // creating box component



