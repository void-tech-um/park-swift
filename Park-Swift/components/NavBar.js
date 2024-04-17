import React,{useState} from 'react';
import { createBottomTabNavigator, createDrawerNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import View from "react-native";
import postScreen from '../screens/postScreen';
import SavedListings from '../screens/SavedListings';
import { StyleSheet } from 'react-native';
import Listing from '../screens/listing';
import HamburgerMenu from '../screens/hamburgerMenu';
import { Modal, TouchableOpacity} from 'react-native-paper';
import FilterScreen from '../screens/filter';
import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const NavBar = ({ route }) => {

    const userId = route.params.userId;

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    return(
        <>
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerSearchBarOption:{
                    placeholder:"Hello",
                },
                headerShown:false,
                tabBarShowLabel: false,
                tabBarStyle: {
                height: "12%",
                paddingHorizontal: 5,
                paddingTop: 0,
                backgroundColor: '#033566',
                position: 'absolute',
                // borderTopWidth: 0,
                },
            })}
            >
            <Tab.Screen name="Home" component={HomeScreen} initialParams={{userId : userId}} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home-outline" color={'white'} size={36}/>
                ),
                headerStyle: {backgroundColor: '#033566', 
                            height:'12%',},
                title:"",
            }}/>
            <Tab.Screen name="SavedListings" component={SavedListings} initialParams={{userId : userId}}options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="bookmark-multiple-outline" color={'white'} size={32} />
                ),
                headerStyle: {backgroundColor: '#033566',
                            height:'12%',},
                title:"",
            }} />
            <Tab.Screen name="List Your Space" component={postScreen} initialParams={{userId : userId}} options={{
                tabBarLabel: 'Home',
                tabBarIcon:({color,size})=>(
                <MaterialCommunityIcons name="plus-circle" color={'white'} size={60}/>
            ),
            headerStyle: {backgroundColor: '#033566',
                            height:'12%',},
            title:"", }}/>

            <Tab.Screen name="Map" component={MapScreen} initialParams={{userId : userId}} options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="map-outline" color={'white'} size={33} />
                ),
                headerStyle: {backgroundColor: '#033566'
                            ,height:'12%',} ,
                title:"",
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{userId : userId}} options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle-outline" color={'white'} size={33}/>
                ),
                headerStyle: {backgroundColor: '#033566'
                                ,height:'12%',} ,
                title:"",
            }}/>
        </Tab.Navigator>
    </>
    );
}


export default NavBar;