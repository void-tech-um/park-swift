import * as React from 'react';
import {View} from 'react-native';
import ProfileDetail from './profile';
import Profile_Header from '../components/Profile_Header';
import { StyleSheet } from 'react-native';
import List_Header from '../components/List_Header';

function ProfileScreen() {
    return (
      
        
      <View>
        <List_Header/>
        <View style={{position:'relative',top:'15%'}}>
        <ProfileDetail/>
        </View>
      </View>
      
    );
  }


export default ProfileScreen;