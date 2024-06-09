import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import MenuSearchBar from './search';
import { useState, useEffect } from 'react';
import {getAllPosts, getPostByStartDate, getUserPosts, getPost, filterByFirstDate, filterByDates, filterByPrice} from '../firebaseFunctions/firebaseFirestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SavedListings from './SavedListings';
import listingsData from '../components/listingsData';
import CustomText from '../components/CustomText';


const windowHeight = Dimensions.get('window').height;

function HomeScreen({route}) {
  const [posts, setPosts] = useState([]); 
  const [myPost, setMyPost] = useState(null);
  const userId = route.params.userId;
  const insets = useSafeAreaInsets();
  const listingCardHeight = windowHeight * 0.2;

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
        <CustomText style={styles.listingsNearYouText} fontFamily="NotoSansTaiTham-Bold">
          Listings For You
        </CustomText>
        <SortingButton />
      </View>
      <ScrollView>
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
      <SavedListings listingsData={listingsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 23,
    marginBottom: 15,
  },
  listingsNearYouText: {
    fontSize: 25,
    letterSpacing: -0.5,
  },
});

export default HomeScreen;