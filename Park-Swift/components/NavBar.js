import React,{useState} from 'react';
import { createBottomTabNavigator, createDrawerNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListingInfoPage from '../screens/listinginfopage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import View from "react-native";
import ListYourSpaceScreen from '../screens/ListYourSpaceScreen';
import RecentlyVisitedProfiles from '../screens/recentlyVisitedProfiles';
import { StyleSheet } from 'react-native';
import ThankYouScreen from '../screens/confirmation';
import Listing from '../screens/listing';
import HamburgerMenu from '../screens/hamburgerMenu';
import { Modal, TouchableOpacity} from 'react-native-paper';


const Tab = createBottomTabNavigator();

const NavBar = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    return(
        <>
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown:false,
                tabBarShowLabel: false,
                tabBarStyle: {
                height: "12%",
                paddingHorizontal: 5,
                paddingTop: 0,
                backgroundColor: '#959595',
                position: 'absolute',
                // borderTopWidth: 0,
                },
            })}
            >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home-outline" color={'white'} size={36}/>
                ),
                headerStyle: {backgroundColor: '#959595', 
                            height:'12%',},
                title:"",
            }}/>
            <Tab.Screen name="Message" component={MessagesScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="message-outline" color={'white'} size={32} />
                ),
                headerStyle: {backgroundColor: '#959595',
                            height:'12%',},
                title:"",
            }} />
            <Tab.Screen name="List Your Space" component={ListYourSpaceScreen} options={{
                tabBarIcon:({color,size})=>(
                <MaterialCommunityIcons name="plus-circle" color={'white'} size={60}/>
            ),
            headerStyle: {backgroundColor: '#959595',
                            height:'12%',},
            title:"", }}/>

            <Tab.Screen name="Map" component={MapScreen} options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="map-outline" color={'white'} size={33} />
                ),
                headerStyle: {backgroundColor: '#959595'
                            ,height:'12%',} ,
                title:"",
            }}/>

            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle-outline" color={'white'} size={33}/>
                ),
                headerStyle: {backgroundColor: '#959595'
                                ,height:'12%',} ,
                title:"",
            }}/>

            <Tab.Screen name="List Info Page" component={ListingInfoPage} options={{
                tabBarVisible:false,
                headerStyle: {backgroundColor: '#959595'
                            ,height:'12%',} ,
                title:"",
            }}/>
            <Tab.Screen name="Thank You" component={ThankYouScreen} options={{
                tabBarVisible:false,
                headerStyle: {backgroundColor: '#959595'
                            ,height:'12%',} ,
                title:"",
            }} />
            <Tab.Screen name="Listing" component={Listing} options={{
                tabBarVisible:false,
                headerStyle: {backgroundColor: '#959595'
                            ,height:'12%',} ,
                title:"",
            }}/>
            <Tab.Screen name="RecentlyVisitedProfiles" component={RecentlyVisitedProfiles} options={{
                tabBarVisible:false,
                headerStyle: {backgroundColor: '#959595'
                            ,height:'12%',} ,
                title:"",
            }}/>
        </Tab.Navigator>
    </>
    );
}


export default NavBar;