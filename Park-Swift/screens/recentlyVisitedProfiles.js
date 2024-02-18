import React from 'react';
import { View,Text, ScrollView } from 'react-native';
import {IconButton } from 'react-native-paper';
import SearchbarComponent from './searchBar';
import ProfileCard from './profileCard';


const RecentlyVisitedProfiles = () => {
    return(
        <>
        <View style={{flexDirection: 'column', flex: 6.4}}>
            
            <View style={{flexDirection: 'row', flex: 0.7}}>
                <View style={{justifyContent: "center"}} >
                    <IconButton icon="arrow-left" size={40} iconColor={"black"}></IconButton>
                </View>
                <View style={{justifyContent: "center"}}>
                    <Text style={{fontSize: 27, textAlign: 'center', fontWeight: "bold"}}>
                        Saved Listings
                    </Text>
                </View>
            </View>

            <View style={{justifyContent: 'center', flex: 0.5}}><SearchbarComponent/></View>
            <View style = {{flex: 0.2}} ></View>
            
            <View style={{flex: 5}}>
            <ScrollView>
                <View><ProfileCard /></View>
                <View><ProfileCard /></View>
                <View><ProfileCard /></View>
                <View><ProfileCard /></View>
            </ScrollView>
            </View>
        </View>
        </>
    );
};


export default RecentlyVisitedProfiles;