import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { useState } from 'react';


const SearchbarComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style = {{marginTop: 30, backgroundColor: 'white', width: 375, alignSelf: 'center'}}
    />
  );
};

export default SearchbarComponent;