import * as React from 'react';
import {View} from 'react-native';
import ProfileDetail from './profile';
import Profile_Header from '../components/Profile_Header';
import { StyleSheet } from 'react-native';

function ProfileScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#ffffff"}}>
        <Profile_Header/>
        <ProfileDetail/>
      </View>
    );
  }


export default ProfileScreen;