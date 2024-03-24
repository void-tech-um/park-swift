import * as React from 'react';
import {Text,View} from 'react-native';
import MenuSearchBar from './search';


function MapScreen() {
    return (
      <View style={{position:'fixed'}}>
        <View style={{width:"100%",}}>
        <MenuSearchBar/>
        </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Map Screen</Text>
      </View>
      </View>
    );
}

export default MapScreen;
