import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchbarComponent from '../components/SearchBar';
import MenuSearchBar from '../components/MenuSearchBar';
import ListingCard from '../components/ListingCard';

const formatDate = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid date";
  }

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};


const SavedListingsScreen = () => {
  const [savedListings, setSavedListings] = useState([]);
  useEffect(() => {
    const fetchSavedListings = async () => {
        try {
            const storedListings = await AsyncStorage.getItem('savedListings');
            console.log("Raw stored listings:", storedListings); // Debugging output

            if (storedListings) {
                let parsedListings = JSON.parse(storedListings);
                // Convert date strings back into Date objects
                parsedListings = parsedListings.map(listing => ({
                    ...listing,
                    startDate: listing.startDate ? new Date(listing.startDate) : null,
                    endDate: listing.endDate ? new Date(listing.endDate) : null,
                }));

                console.log("Parsed listings after conversion:", parsedListings); // Debugging output
                setSavedListings(parsedListings);
            }
        } catch (error) {
            console.error("Error fetching saved listings:", error);
        }
    };

    fetchSavedListings();
}, []);

const handleSavePress = async (listing) => {
  try {
      let savedListings = await AsyncStorage.getItem('savedListings');
      let savedListingsArray = savedListings ? JSON.parse(savedListings) : [];

      const existingIndex = savedListingsArray.findIndex(item => item.postId === listing.postId);

      if (existingIndex !== -1) {
          // Remove listing if it's already saved (un-save)
          savedListingsArray.splice(existingIndex, 1);
      } else {
          // Ensure startDate and endDate exist
          savedListingsArray.push({
              ...listing,
              startDate: listing.startDate 
                  ? new Date(listing.startDate).toISOString() 
                  : new Date().toISOString(), // Default to today if missing
              endDate: listing.endDate 
                  ? new Date(listing.endDate).toISOString() 
                  : new Date().toISOString(), // Default to today if missing
          });
      }
      await AsyncStorage.setItem('savedListings', JSON.stringify(savedListingsArray));
      setSavedListings(savedListingsArray);

      console.log("Updated saved listings:", savedListingsArray); // Debugging output
  } catch (error) {
      console.error("Error saving listing:", error);
  }
};

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
                    key={listing.postId || `listing-${index}`} 
                    id={listing.postId}
                    userID={listing.userID}
                    address={listing.address}
                    date={listing.date}
                    ppHour={listing.ppHour}
                    listingURL={listing.listingURL}
                    startDate={listing.startDate ? new Date(listing.startDate) : null}  // Ensure proper date object
                    endDate={listing.endDate ? new Date(listing.endDate) : null}  // Ensure proper date object
                    isAvailable={listing.isAvailable}
                    showSavedIcon={true}
                    onSavePress={() => handleSavePress(listing)}
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
