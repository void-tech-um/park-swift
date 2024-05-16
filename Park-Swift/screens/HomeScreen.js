import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import SearchBar from '../screens/search.js';
import MenuSearchBar from './search';
import { useState, useEffect } from 'react';
import {getAllPosts, getPostByStartDate, getUserPosts, getPost, filterByFirstDate, filterByDates, filterByPrice} from '../firebaseFunctions/firebaseFirestore';


function HomeScreen({route}) {
  const [posts, setPosts] = useState([]); // Add this line
  const [myPost, setMyPost] = useState(null);
  const userId = route.params.userId;

  useEffect(() => {
      async function fetchPosts() {
          const posts = await filterByPrice(1, 20);
          setPosts(posts); // Update the posts state variable
      }
      fetchPosts();
      getPost('-NuLDKLjCtlKetwDvobU')
            .then((postData) => {
                setMyPost(postData);
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
            });
  }, []); // Add this line

  if (!myPost || !posts) {
    return <Text>Loading...</Text>;
  }

  console.log(posts);

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
        {/*<Text>{posts[0].firstDate} </Text>*/}
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