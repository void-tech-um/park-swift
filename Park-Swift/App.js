import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
// import { LoginScreen } from './src/screens/LoginScreen.js'
// import { HomeScreen } from './src/screens/HomeScreen.js'
// import { RegistrationScreen } from './src/screens/RegistrationScreen'

import { app, analytics, auth, database } from './src/firebase/config';
import { ref, set } from 'firebase/database';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Home">
           {props => <HomeScreen {...props} extraData={user} />} 
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}