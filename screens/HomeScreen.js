import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, } from 'react-native';
import SortingButton from '../components/SortingButton.js';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import MenuSearchBar from '../screens/MenuSearchBar.js';
import { useState, useEffect } from 'react';
import { getPost, filterByPrice } from '../firebaseFunctions/firebaseFirestore';
import ListingsData from '../components/ListingsData.js';

function HomeScreen({ route }) {
  const [posts, setPosts] = useState([]);
  const [myPost, setMyPost] = useState(null);

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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <MenuSearchBar />
      </TouchableWithoutFeedback>
      <CurrentlyRentingCard />
      <View style={styles.headerContainer}>
        <View style={styles.listingsHeaderContainer}>
          <Text style={styles.listingsHeader}>Listings</Text>
          <Text style={[styles.listingsHeader, styles.spacing]}>For</Text>
          <Text style={styles.listingsHeader}>You</Text>
        </View>
        <View style={styles.ButtonContainer}>
          <SortingButton />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {ListingsData.map((listing) => (
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 23,
    marginBottom: 15,
  },
  listingsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4.5%',
  },
  listingsHeader: {
    fontSize: 24,
    fontFamily: "NotoSansTaiTham-Bold",
    letterSpacing: -0.5,
  },
  spacing: {
    marginHorizontal: 5, 
  },
  ButtonContainer: {
    marginRight: '5%',
  },
  scrollViewContainer: {
    paddingBottom: '28%', 
    alignItems: 'center',
  },
});

export default HomeScreen;