import * as React from 'react';
import { View, Text} from 'react-native';
import SearchBar from '../components/SearchBar';
import ListHeader from '../components/ListHeader';

function MessagesScreen() {
    return (
      <View style={{position:'fixed',}}>
        <ListHeader/>
        <Text>Message Screen</Text>
      </View>
    );
  }

export default MessagesScreen