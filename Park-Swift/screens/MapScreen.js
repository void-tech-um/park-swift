import * as React from 'react';
import {Text,View} from 'react-native';
import MenuSearchBar from './search';


function MapScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MenuSearchBar/>
        <Text>Map Screen</Text>
      </View>
    );
}

export default MapScreen;
