import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, } from 'react-native';
import { getDocs, collection, database} from '../firebaseFunctions/firebaseFirestore';
import { useIsFocused } from '@react-navigation/native';
import SortingButton from '../components/SortingButton.js';
import ListingCard from '../components/ListingCard';
//import CurrentlyRentingCard from '../components/CurrentlyRenting';
import MenuSearchBar from '../components/MenuSearchBar.js';
import Car from '../assets/car.png'; 

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  
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
                startDate: data.firstDate || null,  
                endDate: data.lastDate || null, 
                startTime: data.startTime || null,
                endTime: data.endTime || null,
                ppHour: data.price && data.rentalPeriod
                    ? `$${data.price} /${data.rentalPeriod}`
                    : null,
                isNegotiable: data.negotiable ? 'Negotiable' : 'Fixed Price',
                carSize: data.sizeOfCar || "Size not specified",
                userID: data.userID,
            };
        });
        setPosts(postList);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
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

  useEffect(() => {
    if (isFocused) {
      fetchPosts(); 
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <MenuSearchBar/>
      {/*<CurrentlyRentingCard />*/}
      <View style={styles.headerContainer}>
        <View style={styles.listingsHeaderContainer}>
          <Text style={styles.listingsHeader}>Listings</Text>
          <Text style={[styles.listingsHeader, styles.spacing]}>For</Text>
          <Text style={styles.listingsHeader}>You</Text>
        </View>
        <View style={styles.ButtonContainer}>
          <SortingButton/>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {posts.length === 0 ? (
          <View style={styles.noListingsContainer}>
            <Text style={styles.noListingsText}>
              No listings available. Add a post!
            </Text>
          </View>
        ) : (
        posts.map((post) => (
          <ListingCard
            key={post.id}
            address={post.address || 'No address available'}
            startDate={post.startDate}
            endDate={post.endDate}
            startTime={post.startTime}
            endTime={post.endTime}
            image={post.image || Car}
            ppHour={post.ppHour}
            listingURL={post.listingURL || '#'}
            userID={post.userID}
          />
        ))
      )}
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
  noListingsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%', 
  },
  noListingsText: {
    fontSize: 18,
    fontFamily: "NotoSansTaiTham-Bold",
    color: '#000000',
    textAlign: 'center',
  },
});

export default HomeScreen;