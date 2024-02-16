import * as React from 'react';
import {View} from 'react-native';
import ProfileDetail from './profile';

function ProfileScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ProfileDetail/>
      </View>
    );
  }

export default ProfileScreen;