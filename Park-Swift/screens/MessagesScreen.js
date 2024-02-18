import * as React from 'react';
import { View, Text} from 'react-native';
import RecentlyVisitedProfiles from './recentlyVisitedProfiles';

function MessagesScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <RecentlyVisitedProfiles/>
      </View>
    );
  }

export default MessagesScreen