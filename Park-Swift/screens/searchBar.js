import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchbarComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}style 
      style = {{marginTop: 30, backgroundColor: 'white', width: 375, alignSelf: 'center'}}
    />
  );
};

export default SearchbarComponent;