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
      async function fetchPosts() {
          // const posts = await filterByPrice(minPrice,maxPrice);
          // post = await filterByDates(beginDate,endDate);
          // console.log(posts);
          // console.log(minPrice,maxPrice)
          // setPosts(posts); // Update the posts state variable

          try {
            // Fetch posts filtered by dates
            const postsByDates = await filterByDates(beginDate, endDate);
            console.log('Posts filtered by dates:', postsByDates);
    
            // Fetch Posts filtered by price
            const postsByPrice = await filterByPrice(minPrice,maxPrice);
            console.log('Posts filtered by prices:', postsByPrice);
            
            function isSamePost(post1, post2) {
              return post1.firstDate === post2.firstDate &&
                     post1.lastDate === post2.lastDate &&
                     post1.price === post2.price
          }
          
          // Find the intersection of both filtered sets
          const filteredPosts = postsByDates.filter(post1 => 
              postsByPrice.some(post2 => isSamePost(post1, post2))
          );
          

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