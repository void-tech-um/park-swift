import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text, StyleSheet, Dimensions, Platform } from 'react-native';

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

const { height: screenHeight } = Dimensions.get('window');

const calculateNavBarHeight = () => {
    if (screenHeight <= 718) { // 5.6" and below
        return screenHeight * 0.132;
    } else if (screenHeight <= 719) { // 5.7" and below
        return screenHeight * 0.125;
    } else if (screenHeight <= 778) { // 6.0" and below
        return screenHeight * 0.123;
    } else if (screenHeight <= 903) { // 6.7" and below
        return screenHeight * 0.11;
    } else {
        return screenHeight * 0.1;
    }
};

const navBarHeight = Platform.OS === 'ios' ? screenHeight * 0.1 : calculateNavBarHeight();

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

    // Calculate dynamic margins
    const tabBarLabelMarginBottom = Platform.OS === 'android' ? navBarHeight * 0.17 : -navBarHeight * 0.15;
    const listLabelMarginTop = Platform.OS === 'android' ? navBarHeight * 0.135 : navBarHeight * 0.15;
    const listLabelMarginBottom = Platform.OS === 'android' ? navBarHeight * 0.09 : -navBarHeight * 0.25;

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: navBarHeight,
                    paddingHorizontal: '2.3%',
                    backgroundColor: '#052658',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 0,
                },
                tabBarItemStyle: {
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Platform.OS === 'android' ? '4%' : '5%',
                },
                tabBarIconStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarActiveTintColor: '#FED869',
                tabBarInactiveTintColor: 'white',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                initialParams={{ userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={[styles.tabBarLabel, { marginBottom: tabBarLabelMarginBottom, color: focused ? '#FED869' : 'white' }]}>Home</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? HomeIconColor : HomeIcon} style={{ width: 40, height: 40 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="SavedListingsScreen"
                component={SavedListingsScreen}
                initialParams={{ userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={[styles.tabBarLabel, { marginBottom: tabBarLabelMarginBottom, color: focused ? '#FED869' : 'white' }]}>Saved</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? BookmarksIconColor : BookmarksIcon} style={{ width: 40, height: 40 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="List Your Space"
                component={PostScreen}
                initialParams={{ userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={[styles.listLabel, { marginTop: listLabelMarginTop, marginBottom: listLabelMarginBottom, color: focused ? '#FED869' : 'white' }]}>List</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={PlusIcon} style={{ width: 60, height: 60, tintColor: focused ? '#FED869' : 'white' }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                initialParams={{ userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={[styles.tabBarLabel, { marginBottom: tabBarLabelMarginBottom, color: focused ? '#FED869' : 'white' }]}>Map</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? MapIconColor : MapIcon} style={[styles.mapIcon, { width: 40, height: 40 }]} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                initialParams={{ userId }}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={[styles.tabBarLabel, { marginBottom: tabBarLabelMarginBottom, color: focused ? '#FED869' : 'white' }]}>Profile</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? UserIconColor : UserIcon} style={{ width: 40, height: 40 }} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 12,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    listLabel: {
        fontSize: 12,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    mapIcon: {
        marginTop: '7.5%',
    },
});

export default NavBar;
