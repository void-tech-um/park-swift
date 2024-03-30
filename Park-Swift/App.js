import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ThankYouScreen from './screens/confirmation.js';
import NavBar from './components/NavBar.js';
import { app, analytics, auth, database } from './services/config';
import { ref, set } from 'firebase/database';
//import {decode, encode} from 'base-64'
//if (!global.btoa) {  global.btoa = encode }
//if (!global.atob) { global.atob = decode }

import postScreen from './screens/postScreen';


const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* TODO: LoginScreen AND RegistrationScreen COMMENTED OUT FOR DISABLING LOGIN DURING DEVELOPMENT */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Tab" component={NavBar} options={{ headerShown: false}}/>
        <Stack.Screen name="ThankYou" component={ThankYouScreen} options={{headerStyle: {backgroundColor: '#959595', height:'12%'},}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// //Search Bar





// // creating box component



