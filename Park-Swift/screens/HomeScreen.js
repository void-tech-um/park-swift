import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, SafeAreaView } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import SearchBar from '../screens/search.js';
import MenuSearchBar from './search';
import { useState, useEffect } from 'react';
import {getAllPosts, getPostByStartDate, getUserPosts, getPost, filterByFirstDate, filterByDates, filterByPrice} from '../firebaseFunctions/firebaseFirestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';


const windowHeight = Dimensions.get('window').height;

function HomeScreen({route}) {
  const [posts, setPosts] = useState([]); // Add this line
  const [myPost, setMyPost] = useState(null);
  const userId = route.params.userId;
  const insets = useSafeAreaInsets();
  const listingCardHeight = windowHeight * 0.2; // replace 0.2 with the actual percentage

  useEffect(() => {
      async function fetchPosts() {
          const posts = await filterByPrice(1, 20);
          setPosts(posts); // Update the posts state variable
      }
      fetchPosts();
      getPost('9YCofto5I1dUh2M2lbho')
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
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                          accessible={false}>
          <MenuSearchBar />
        </TouchableWithoutFeedback>
        <CurrentlyRentingCard />
        <View style={styles.headerContainer}>
        <Text style={styles.listingsNearYouText}>Listings For You</Text>
        <SortingButton />
      </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + listingCardHeight }} 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {listingsData.map((listing) => (
            <ListingCard
              key={listing.id}
              address={listing.address}
              date={listing.date}
              startTime={listing.startTime}
              endTime={listing.endTime}
              image={listing.image}
              ppHour={listing.ppHour}
              listingURL={listing.listingURL}
            />
          ))}
        </ScrollView>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  listingsNearYouText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  // No additional or complex styling to affect layout
});

export default HomeScreen;