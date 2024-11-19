import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, } from 'react-native';
import SortingButton from '../components/SortingButton.js';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import MenuSearchBar from './MenuSearchBar.js';
import { getPost, getDocs, collection, database} from '../firebaseFunctions/firebaseFirestore';
import Car from '../assets/car.png'; 
import { useNavigation } from "@react-navigation/native";

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function HomeScreen({ route }) {
  const [posts, setPosts] = useState([]);
  const [myPost, setMyPost] = useState(null);
  const userID = route.params?.userID; 
  const navigation = useNavigation();

  const navigateToHomeScreen = () => {
    navigation.navigate('HomeScreen', { userID: userID });
  };
  
  useEffect(() => {
    async function fetchPosts() {
        try {
            const postsCollectionRef = collection(database, "posts"); // Use 'database' here
            const querySnapshot = await getDocs(postsCollectionRef);
            const postList = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    address: data.location,
                    date: `${formatDate(data.firstDate)} - ${formatDate(data.lastDate)}`,
                    startTime: null,
                    endTime: null,
                    ppHour: `$${data.price} /${data.rentalPeriod}`,
                    userID: data.userID,
                };
            });
            setPosts(postList);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
    fetchPosts();

    getPost('9YCofto5I1dUh2M2lbho')
        .then((postData) => {
            setMyPost(postData);
        })
        .catch((error) => {
            console.error('Error fetching post:', error);
        });
  }, []);

  if (!myPost || posts.length === 0) {
    return <Text>Loading...</Text>;
  }

  console.log(posts);

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