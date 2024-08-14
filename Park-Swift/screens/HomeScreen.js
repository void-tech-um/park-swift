import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import MenuSearchBar from './search';
import { useState, useEffect } from 'react';
import {getAllPosts, getPostByStartDate, getUserPosts, getPost, filterByFirstDate, filterByDates, filterByPrice, filter} from '../firebaseFunctions/firebaseFirestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SavedListings from './SavedListings';
import listingsData from '../components/listingsData';
import CustomText from '../components/CustomText';


const windowHeight = Dimensions.get('window').height;

function HomeScreen({route}) {
  const [posts, setPosts] = useState([]); 
  const [myPost, setMyPost] = useState(null);


  const [price,setPrice]= useState(null); 
  const [date,setDate]=useState(null);
  const [time,setTime]=useState(null);

  const [minPrice,setMinPrice] = useState(null);
  const [maxPrice,setMaxPrice] = useState(null);
  const [beginDate,setBeginDate] = useState(null);
  const [endDate,setEndDate] = useState(null);

  
  const userId = route.params.userId;
  const insets = useSafeAreaInsets();
  const listingCardHeight = windowHeight * 0.2;

  useEffect(() => {

      // Filtering is done here
      async function fetchPosts() {
          try {
            const filteredPosts = await filter(minPrice,maxPrice, beginDate, endDate);
             
            console.log('Filtered posts:', filteredPosts);
    
            // Update the posts state variable
            setPosts(filteredPosts);
    
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
      }

      getAllPosts()
          .then((data)=>{
            setPosts([...data,data])
          })
          .catch((error)=>{
            console.log('Error Fetching Post:',error);
          })

      fetchPosts();
      
  }, [minPrice,maxPrice,beginDate,endDate]); // Add this line

  if (!posts) {
    return <Text>Loading...</Text>;
  }


  const list=posts.map((listing) => (
    <ListingCard
      key={listing.id}
      address={listing.location}
      date={listing.date}
      startTime={listing.firstDate}
      endTime={listing.lastDate}
      image={listing.image}
      price={listing.price}
      priceUnit={listing.rentalPeriod}
      listingURL={listing.listingURL}
    />
  ));



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
        <SortingButton setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setDate={setDate} setTime={setTime} setBeginDate={setBeginDate} setEndDate={setEndDate}/>
      </View>
      <View></View>
      <ScrollView>
        {list}
      </ScrollView>
      {/* <SavedListings listingsData={listingsData} /> */}
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