import * as React from 'react';
import { View, Text} from 'react-native';
import SearchBar from './search';
import List_Header from '../components/List_Header';

function MessagesScreen() {
    return (
      <View style={{position:'fixed',}}>
        <List_Header/>
        <Text>Message Screen</Text>
      </View>
    );
  }

export default MessagesScreen