import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import MenuSearchBar from './search';
import { useState, useEffect } from 'react';
import {getAllPosts, getPostByStartDate, getUserPosts, getPost, filterByFirstDate, filterByDates, filterByPrice, getListingCardInfo} from '../firebaseFunctions/firebaseFirestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SavedListings from './SavedListings';
import listingsData from '../components/listingsData';
import CustomText from '../components/CustomText';
import { app } from "../services/configFirestore" 
import { getFirestore, collection, getDocs } from "firebase/firestore";


const windowHeight = Dimensions.get('window').height;

function HomeScreen({route}) {
  const [posts, setPosts] = useState([]); 
  const userId = route.params.userId;
  const insets = useSafeAreaInsets();
  const listingCardHeight = windowHeight * 0.2;

  useEffect(() => {
      async function fetchPosts() {
        try {
          // const posts = await filterByPrice(1, 20);
          
          const database = getFirestore(app);

          const querySnapshot = await getDocs(collection(database, "posts"));

          const postList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          setPosts(postList);
        }
        catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
      fetchPosts();
      
  }, []); // Add this line

  if (posts.length === 0) {
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
      {posts.map((post) => (
          <ListingCard
            key={post.id}
            address={post.address}
            date={post.date}
            startTime={post.startTime}
            endTime={post.endTime}
            image={post.image}
            ppHour={post.ppHour}
            listingURL={post.listingURL}
          />
        ))}
      </ScrollView>
      <SavedListings listingsData={posts} />
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