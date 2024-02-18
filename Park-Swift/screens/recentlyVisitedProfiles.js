import React from 'react';
// import { Appbar } from 'react-native-paper';
import { View,Text, ScrollView } from 'react-native';
import {IconButton } from 'react-native-paper';
import SearchbarComponent from './searchBar';
import ProfileCard from './profileCard';

import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecentlyVisitedProfiles = ( ) => {
    const navigation = useNavigation();
    const navigateToHomePage = () => {
        navigation.navigate('Home');
    };

    return(
        <>
        <View>
            {/* <Appbar.Header></Appbar.Header> */}
            <View style={{flexDirection: 'row'}}>
                <View style={{ flex: 0.1, paddingTop: 75}} >
                    <TouchableOpacity onPress={navigateToHomePage}>
                        <IconButton icon="arrow-left" size={40} iconColor={"black"} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.9}}><Text style={{marginTop: 90, fontSize: 27, textAlign: 'center', fontWeight: "bold"}}> Recently Visited Profiles</Text></View>
            </View>
            <View style={{marginTop: 0}}><SearchbarComponent/></View>
            <ScrollView>
                <View><ProfileCard /></View>
                <View><ProfileCard /></View>
                <View><ProfileCard /></View>
                <View><ProfileCard /></View>
            </ScrollView>
        </View>
        </>
    );
};


export default RecentlyVisitedProfiles;