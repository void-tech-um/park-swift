import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import SearchbarComponent from './searchBar';
import ListHeader from '../components/ListHeader';
import ListingCard from '../components/ListingCard';
import ListingsData from '../components/ListingsData';
import { StyleSheet } from 'react-native';

const SavedListings = () => {
  return (
    <View style={{ flexDirection: 'column', flex: 6.4 }}>
      <ListHeader />
      <View style={{ flexDirection: 'row', flex: 0.7 }}>
        <View style={{ justifyContent: "center" }}>
        <Text style={styles.savedListingsText}>
            Saved Listings
        </Text>
        </View>
      </View>
        <SearchbarComponent />
      <View style={{ flex: 5 }}>
        
        <ScrollView>
          {ListingsData.map((listing) => (
            <ListingCard
              key={listing.id}
              address={listing.address}
              date={listing.date}
              startTime={listing.startTime}
              endTime={listing.endTime}
              image={listing.image}
              ppHour={listing.ppHour}
              listingURL={listing.listingURL}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    savedListingsText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 20,    
    },
  });

  
export default SavedListings;