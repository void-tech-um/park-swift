import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchbar}
    />
  );
};

const styles = {
  searchbar: {
    marginBottom: 15, 
    backgroundColor: '#D9D9D9',
    width: 385,
    alignSelf: 'center',
    borderRadius: 17,  
  },
};

export default SearchBar;