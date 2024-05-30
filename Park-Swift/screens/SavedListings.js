import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchbarComponent from './searchBar';
import List_Header from '../components/List_Header';
import ListingCard from '../components/ListingCard';
import listingsData from '../components/listingsData';

const SavedListings = () => {
  return (
    <View style={styles.container}>
      <List_Header />
      <View style={styles.headerRow}>
        <View style={styles.headerContent}>
          <Text style={styles.savedListingsText}>
            Saved Listings
          </Text>
        </View>
      </View>
      <SearchbarComponent />
      <View style={styles.listingsContainer}>
        <ScrollView>
          {listingsData.map((listing) => (
            <ListingCard
              key={listing.id}
              address={listing.address}
              date={listing.date}
              startTime={listing.startTime}
              endTime={listing.endTime}
              image={listing.image}
              ppHour={listing.ppHour}
              listingURL={listing.listingURL}
              isAvailable={listing.id !== 2 && listing.id !== 3}
              showSavedIcon={true}
            />
          ))}
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
});

export default SavedListings;
