import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/profile';
import ListingInfoPage from '../screens/listinginfopage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import View from "react-native";
import postScreen from '../screens/postScreen';
import RecentlyVisitedProfiles from '../screens/recentlyVisitedProfiles';

import ThankYouScreen from '../screens/confirmation';
import Listing from '../screens/listing';
import FilterScreen from '../screens/filter';


const Tab = createBottomTabNavigator();

const NavBar = ({ route }) => {

    const userId = route.params.userId;

    return(
        <Tab.Navigator
            initialRouteName="Home"
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
            <Tab.Screen name="Home" component={HomeScreen} initialParams={{userId : userId}} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home-outline" color={'white'} size={36}/>
                ),
            }}/>
            <Tab.Screen name="Message" component={MessagesScreen} initialParams={{userId : userId}}options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="message-outline" color={'white'} size={32} />
                ),
            }} />
            <Tab.Screen name="List Your Space" component={postScreen} initialParams={{userId : userId}} options={{
                tabBarIcon:({color,size})=>(
                <MaterialCommunityIcons name="plus-circle" color={'white'} size={60}/>
            ),}}/>

            <Tab.Screen name="Map" component={MapScreen} initialParams={{userId : userId}} options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="map-outline" color={'white'} size={33} />
                ),
            }}/>

            <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{userId : userId}} options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle-outline" color={'white'} size={33}/>
                ),
            }}/>

            <Tab.Screen name="List Info Page" component={ListingInfoPage} initialParams={{userId : userId}} options={{
                tabBarVisible:false,
            }}/>
            <Tab.Screen name="Thank You" component={ThankYouScreen} initialParams={{userId : userId}}  options={{
                tabBarVisible:false,
            }} />
            <Tab.Screen name="Listing" component={Listing} initialParams={{userId : userId}} options={{
                tabBarVisible:false,
            }}/>
            <Tab.Screen name="RecentlyVisitedProfiles" component={RecentlyVisitedProfiles} initialParams={{userId : userId}} options={{
                tabBarVisible:false,
            }}/>
            <Tab.Screen name="FilterScreen" component={FilterScreen} initialParams={{userId : userId}} options={{
                tabBarVisible:false,
            }}/>
        </Tab.Navigator>
    );
}

export default NavBar;