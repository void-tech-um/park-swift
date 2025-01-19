import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, } from 'react-native';
import SortingButton from '../components/SortingButton.js';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import MenuSearchBar from './MenuSearchBar.js';
import { getPost, getDocs, collection, database} from '../firebaseFunctions/firebaseFirestore';
import Car from '../assets/car.png'; 
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';

function HomeScreen({ route }) {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const userID = route.params?.userID; 
  const navigation = useNavigation();

  const navigateToHomeScreen = () => {
    navigation.navigate('HomeScreen', { userID: userID });
  };
  
  function formatDate(dateString) {
    if (!dateString || dateString === "null" || dateString === "undefined") {
      return "No date available"; 
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date"; 
    }
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
  
  async function fetchPosts() {
    try {
        const postsCollectionRef = collection(database, "posts");
        const querySnapshot = await getDocs(postsCollectionRef);

        const postList = querySnapshot.docs.map((doc) => {
            const data = doc.data();

            const date =
              data.firstDate && data.lastDate
                ? `${formatDate(data.firstDate)} - ${formatDate(data.lastDate)}`
                : "No date available"; 

            return {
                id: doc.id,
                address: data.location,
                date: date,
                startTime: data.startTime || null,
                endTime: data.endTime || null,
                ppHour: data.price && data.rentalPeriod
                    ? `$${data.price} /${data.rentalPeriod}`
                    : "Price not available",
                isNegotiable: data.isNegotiable ? 'Negotiable' : 'Fixed Price',
                carSize: data.sizeOfCar || "Size not specified",
                userID: data.userID,
            };
        });

        setPosts(postList);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
  };

  
  
  useEffect(() => {
    if (isFocused) {
      fetchPosts(); 
    }
  }, [isFocused]);

  if (posts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No listings available. Add a post!</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
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
        {posts.map((post) => (
          <ListingCard
            key={post.id}
            address={post.address || 'No address available'}
            date={post.date || 'No date available'}
            startTime={post.startTime}
            endTime={post.endTime}
            image={post.image || Car}
            ppHour={post.ppHour}
            listingURL={post.listingURL || '#'}
            userID={post.userID}
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