import { StyleSheet, Text, View } from 'react-native';

// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
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
      <Text>Profile Screen</Text>
    </View>
  );
}

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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
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
