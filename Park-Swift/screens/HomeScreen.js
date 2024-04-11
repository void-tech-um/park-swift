import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import SearchBar from '../screens/search.js';
import MenuSearchBar from './search';
import { useState, useEffect } from 'react';
import {getAllPosts, getPostByStartDate, getUserPosts} from '../firebaseFunctions/firebase';


function HomeScreen({route}) {
  const [posts, setPosts] = useState([]); // Add this line
  const userId = route.params.userId;

  useEffect(() => {
      async function fetchPosts() {
          const posts = await getAllPosts();
          setPosts(posts); // Update the posts state variable
      }
      fetchPosts();
  }, []); // Add this line
  alert(posts[0].firstDate);

    return (
      <View style={{position:"fixed",}}>
         <MenuSearchBar/>
        <View style={{ alignItems: 'center', justifyContent: 'center', top:'-10px', }}>
          <CurrentlyRentingCard />
            {/* Place the "Listings Near You" text right below the CurrentlyRentingCard component */}
            <Text style={styles.listingsNearYouText}>Listings Near You</Text>
            <SortingButton />
            <ListingCard />
        </View>
        <Text>{posts[0].firstDate} </Text>
      </View>
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
    marginLeft: -220,
  },
  // No additional or complex styling to affect layout
});

export default HomeScreen;