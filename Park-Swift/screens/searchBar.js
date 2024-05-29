import * as React from 'react';
import { Searchbar } from 'react-native-paper';
const SearchbarComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchbar}
      inputStyle={styles.inputText}
      placeholderTextColor="#A3A3A3"
    />
  );
};

const styles = {
  searchbar: {
    marginBottom: 15, 
    marginTop: -6,
    backgroundColor: '#D9D9D9',
    width: 385,
    height: 45,
    alignSelf: 'center',
    borderRadius: 17,  
  },
  inputText: {
      fontSize: 16,
      marginVertical: -3,
      fontFamily: "NotoSansTaiTham-Regular",
  },
  
};

export default SearchbarComponent;