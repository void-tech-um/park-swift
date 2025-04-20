import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import SearchbarComponent from '../components/SearchBar';
import MenuSearchBar from '../components/MenuSearchBar';
import ListingCard from '../components/ListingCard';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../firebaseFunctions/firebaseFirestore'; // Adjust path if needed

const SavedListingsScreen = () => {
  const [savedListings, setSavedListings] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchSavedListings = async () => {
        try {
          const storedListings = await AsyncStorage.getItem('savedListings');
          if (storedListings) {
            let parsedListings = JSON.parse(storedListings);
      
            const validListings = [];
      
            for (let listing of parsedListings) {
              try {
                const postRef = doc(database, "posts", listing.postId);
                const postSnap = await getDoc(postRef);
                if (postSnap.exists()) {
                  const postData = postSnap.data();
                  validListings.push({
                    postId: listing.postId,
                    address: postData.location || listing.address,
                    ppHour: postData.price && postData.rentalPeriod
                        ? `$${postData.price} /${postData.rentalPeriod}`
                        : listing.ppHour,
                    startDate: postData.firstDate ? new Date(postData.firstDate) : null,
                    endDate: postData.lastDate ? new Date(postData.lastDate) : null,
                    startTime: postData.startTime || listing.startTime,
                    endTime: postData.endTime || listing.endTime,
                    images: postData.images || [],
                    userID: postData.userID || listing.userID,
                    isAvailable: postData.isAvailable !== undefined ? postData.isAvailable : listing.isAvailable,
                  });
                }                
              } catch (checkErr) {
                console.warn(`Failed to check listing ${listing.postId}`, checkErr);
              }
            }
      
            await AsyncStorage.setItem('savedListings', JSON.stringify(validListings));
            setSavedListings(validListings);
          } else {
            setSavedListings([]);
          }
        } catch (error) {
          console.error("Error fetching saved listings:", error);
        }
      };
        fetchSavedListings();
    }, [])
  );

  return (
    <View style={styles.container}>
      <MenuSearchBar showSearchBar={false} />
      <View style={styles.headerRow}>
        <View style={styles.headerContent}>
          <Text style={styles.savedListingsText}>
            Saved Listings
          </Text>
        </View>
      </View>
      <SearchbarComponent />
      <View style={styles.listingsContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {savedListings.length > 0 ? (
            savedListings.map((listing, index) => (
              <ListingCard
                key={listing.postId ? listing.postId : `listing-${index}`}
                id={listing.postId}
                userID={listing.userID}
                address={listing.address}
                ppHour={listing.ppHour}
                listingURL={listing.listingURL}
                startDate={listing.startDate}
                endDate={listing.endDate}
                startTime={listing.startTime}
                endTime={listing.endTime}   
                isAvailable={listing.isAvailable}
                images={listing.images}
                image={listing.images?.[0]}
                showSavedIcon={true}
                isSaved={true} 
                handleSavePress={() => handleSavePress(listing)}
              />
            ))
        ) : (
            <Text style={styles.noListingsText}>No saved listings yet.</Text>
        )}
      </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    flex: 0.7,
  },
  headerContent: {
    justifyContent: "center",
  },
  savedListingsText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 20,
    fontFamily: 'NotoSansTaiTham-Bold',
  },
  listingsContainer: {
    flex: 5,
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingBottom: '8%',
  },
  noListingsText: {
    fontSize: 18,
    marginTop: "5%",
    fontFamily: "NotoSansTaiTham-Bold",
    color: '#000000',
    textAlign: 'center',
  },
});

export default SavedListingsScreen;
