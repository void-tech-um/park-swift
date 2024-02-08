import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, MapScreen,MessagesScreen,ProfileScreen } from '../App';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import View from "react-native";
import ListYourSpaceScreen from '../screens/ListYourSpaceScreen';


const Tab = createBottomTabNavigator();

const NavBar = () => {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: {
                height: 95,
                paddingHorizontal: 5,
                paddingTop: 0,
                backgroundColor: '#959595',
                position: 'absolute',
                borderTopWidth: 0,
                },
            })}
            >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home-outline" color={'white'} size={36}/>
                ),
            }}/>
            <Tab.Screen name="Message" component={MessagesScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="message-outline" color={'white'} size={32} />
                ),
            }} />
            <Tab.Screen name="List Your Space" component={ListYourSpaceScreen} options={{
                tabBarIcon:({color,size})=>(
                <MaterialCommunityIcons name="plus-circle" color={'white'} size={60}/>
            ),}}/>
            <Tab.Screen name="Map" component={MapScreen} options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="map-outline" color={'white'} size={33} />
                ),
            }}/>

            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle-outline" color={'white'} size={33}/>
                ),
            }}/>
        </Tab.Navigator>
    );
}

export default NavBar;