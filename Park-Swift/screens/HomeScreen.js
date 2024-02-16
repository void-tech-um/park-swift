import * as React from 'react';
import {View} from 'react-native';
import SearchBar from './search';
import CurrentTile from './home';


function HomeScreen() {
    // adding currentTile and search bar components
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <React.Fragment>
          <SearchBar/>
          <CurrentTile/>
        </React.Fragment>
      </View>
    );
  }

  export default HomeScreen;