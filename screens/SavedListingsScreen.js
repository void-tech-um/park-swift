import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import SearchbarComponent from '../components/SearchBar';
import MenuSearchBar from '../components/MenuSearchBar';
import ListingCard from '../components/ListingCard';

const SavedListingsScreen = () => {
  const [savedListings, setSavedListings] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchSavedListings = async () => {
        try {
            const storedListings = await AsyncStorage.getItem('savedListings');
            if (storedListings) {
                let parsedListings = JSON.parse(storedListings);
                parsedListings = parsedListings.map(listing => ({
                    ...listing,
                    startDate: listing.startDate ? new Date(listing.startDate) : null,
                    endDate: listing.endDate ? new Date(listing.endDate) : null,
                }));
                setSavedListings(parsedListings);
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
                isAvailable={listing.isAvailable}
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
