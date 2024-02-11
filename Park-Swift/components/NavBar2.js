import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import View from "react-native";
import ListingInfoPage from '../screens/listinginfopage';
import ThankYouScreen from '../screens/confirmation';
import Listing from '../screens/listing';


const Tab = createBottomTabNavigator();

const NavBar2 = () => {
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
        </Tab.Navigator>
    );
}

export default NavBar2;