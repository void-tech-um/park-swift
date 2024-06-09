import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/profile';
import postScreen from '../screens/postScreen';
import SavedListings from '../screens/SavedListings';

import HomeIcon from '../assets/home.png';
import HomeIconColor from '../assets/home_color.png';
import MapIcon from '../assets/map.png';
import MapIconColor from '../assets/map_color.png';
import UserIcon from '../assets/user.png';
import UserIconColor from '../assets/user_color.png';
import BookmarksIcon from '../assets/bookmarks.png';
import BookmarksIconColor from '../assets/bookmarks_color.png';
import PlusIcon from '../assets/Plus.png';

const Tab = createBottomTabNavigator();

const NavBar = ({ route }) => {
    const userId = route.params.userId;

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: '11.5%',
                    paddingHorizontal: 10,
                    paddingTop: 5,
                    backgroundColor: '#052658',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    textAlign: 'center',
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarIconStyle: {
                    alignItems: 'center',
                    marginTop: 16,
                },
                tabBarActiveTintColor: '#FED869',
                tabBarInactiveTintColor: 'white',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                initialParams={{ userId: userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#FED869' : 'white' }}>Home</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? HomeIconColor : HomeIcon} style={{ width: 40, height: 40 ,}} />
                    ),
                }}
            />
            <Tab.Screen
                name="SavedListings"
                component={SavedListings}
                initialParams={{ userId: userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#FED869' : 'white' }}>Saved</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? BookmarksIconColor : BookmarksIcon} style={{ width: 40, height: 40 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="List Your Space"
                component={postScreen}
                initialParams={{ userId: userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={[styles.listLabel, { color: focused ? '#FED869' : 'white' }]}>List</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={PlusIcon} style={{ width: 60, height: 60, tintColor: focused ? '#FED869' : 'white' }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                initialParams={{ userId: userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#FED869' : 'white' }}>Map</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? MapIconColor : MapIcon} style={{ width: 40, height: 40 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={{ userId: userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#FED869' : 'white' }}>Profile</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? UserIconColor : UserIcon} style={{ width: 40, height: 40 }} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    listLabel: {
        marginBottom: -10,
        marginTop:10, 
    },
});

export default NavBar;
