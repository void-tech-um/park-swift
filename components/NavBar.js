import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text, StyleSheet, Dimensions, View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen.js';
import SavedListingsScreen from '../screens/SavedListingsScreen.js';
import EditProfileScreen from '../screens/EditProfileScreen';

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
const ProfileStack = createStackNavigator();

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Dynamically calculate navBarHeight
const navBarHeight = screenHeight * 0.1;
const iconSize = screenWidth * 0.1; // Icon size based on screen width
const labelFontSize = Math.max(12, screenWidth * 0.03); // Ensure font size scales but doesn't go too small

const ProfileStackScreen = ({ route }) => {
    const { userId } = route.params;

    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} initialParams={{ userId }} />
            <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} initialParams={{ userId }} />
        </ProfileStack.Navigator>
    );
};

const NavBar = ({ route }) => {
    const { userId } = route.params;

    // Dynamic calculations for spacing
    const containerHeight = navBarHeight * 0; // Height for icon + label container
    const blueBackgroundPadding = navBarHeight * 0.13; // Padding above and below the container
    const iconSpacing = containerHeight * 0; // Space between icon and label

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false, // Turn off default labels
                tabBarStyle: {
                    height: navBarHeight,
                    backgroundColor: '#052658',
                    paddingHorizontal: '3%',
                    borderTopWidth: 0,
                },
            }}
        >
            {[
                {
                    name: 'Home',
                    component: HomeScreen,
                    icon: { default: HomeIcon, active: HomeIconColor },
                    label: 'Home',
                },
                {
                    name: 'SavedListingsScreen',
                    component: SavedListingsScreen,
                    icon: { default: BookmarksIcon, active: BookmarksIconColor },
                    label: 'Saved',
                },
                {
                    name: 'List Your Space',
                    component: PostScreen,
                    icon: { default: PlusIcon },
                    iconStyle: { width: iconSize * 1.3, height: iconSize * 1.3 }, 
                },
                {
                    name: 'Map',
                    component: MapScreen,
                    icon: { default: MapIcon, active: MapIconColor },
                    label: 'Map',
                },
                {
                    name: 'Profile',
                    component: ProfileStackScreen,
                    icon: { default: UserIcon, active: UserIconColor },
                    label: 'Profile',
                },
            ].map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.name}
                    component={tab.component}
                    initialParams={{ userId }}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.tabContainer, { height: containerHeight, paddingVertical: blueBackgroundPadding }]}>
                                <Image
                                    source={tab.icon.default} // Use the same source for all states
                                    style={[
                                        {
                                            width: iconSize,
                                            height: iconSize,
                                            tintColor: focused ? '#FED869' : 'white', // Change color dynamically
                                        },
                                        tab.iconStyle,
                                    ]}
                                />
                                <Text style={[styles.tabBarLabel, { marginTop: iconSpacing, color: focused ? '#FED869' : 'white' }]}>
                                    {tab.label}
                                </Text>
                            </View>
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },

});


export default NavBar;