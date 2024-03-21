import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import SearchBar from '../screens/search.js';
import MenuSearchBar from './search';


function HomeScreen() {
    // adding currentTile and search bar components
  
    return (
      <View style={{position:"fixed",}}>
         <MenuSearchBar/>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top:'-10px', }}>
        {/* <React.Fragment> */}
          {/* <View style={styles.searchBarContainer}> */}
  
          <Text>Home Screen</Text>
          </View>
      </View>

      //   {/* </React.Fragment> */}
      //   <CurrentlyRentingCard />
      //   {/* Place the "Listings Near You" text right below the CurrentlyRentingCard component */}
      //   <Text style={styles.listingsNearYouText}>Listings Near You</Text>
      //   <SortingButton />
      //   <ListingCard />
      // </View>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBarContainer: {
    position:"absolute",
    // marginTop: 60,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  listingsNearYouText: {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 180, // Add a little space above the text if needed
    fontSize: 25,
    marginLeft: 10,
  },
  // No additional or complex styling to affect layout
});

export default HomeScreen;