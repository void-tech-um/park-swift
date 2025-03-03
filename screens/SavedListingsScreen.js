import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchbarComponent from '../components/SearchBar';
import MenuSearchBar from '../components/MenuSearchBar';
import ListingCard from '../components/ListingCard';

const SavedListingsScreen = ({route, navigation }) => {
  const [savedListings, setSavedListings] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchSavedListings = async () => {
        try {
          const storedListings = await AsyncStorage.getItem('savedListings');
          if (storedListings) {
              const parsedListings = JSON.parse(storedListings);
              setSavedListings(parsedListings);
          }
        } catch (error) {
            console.error("Error fetching saved listings:", error);
        }
      };    
      fetchSavedListings();
    }, [])
  );

  const handleSavePress = async (postId) => {
    try {
        let savedListings = await AsyncStorage.getItem('savedListings');
        let savedListingsArray = savedListings ? JSON.parse(savedListings) : [];

        const listingIndex = savedListingsArray.findIndex(item => item.postId === postId);
        if (listingIndex !== -1) {
            savedListingsArray.splice(listingIndex, 1); 
        } else {
            const listing = savedListings.find(item => item.postId === postId);
            if (listing) {
                savedListingsArray.push(listing); 
            }
        }

        await AsyncStorage.setItem('savedListings', JSON.stringify(savedListingsArray));
        setSavedListings(savedListingsArray);
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
              address={listing.address}
              date={listing.date}
              ppHour={listing.ppHour}
              listingURL={listing.listingURL}
              showSavedIcon={true}
              isSaved={true}
              onSavePress={() => handleSavePress(listing.postId)}
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
