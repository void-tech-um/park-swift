import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import SearchbarComponent from './searchBar';
import List_Header from '../components/List_Header';
import ListingCard from '../components/ListingCard';
import listingsData from '../components/listingsData';

const SavedListings = () => {
  return (
    <View style={{ flexDirection: 'column', flex: 6.4 }}>
      <List_Header />
      <View style={{ flexDirection: 'row', flex: 0.7 }}>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 28, textAlign: 'center', fontWeight: "bold" }}>
            Saved Listings
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', flex: 0.5 }}>
        <SearchbarComponent />
      </View>
      <View style={{ flex: 0.2 }}></View>
      <View style={{ flex: 5 }}>
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
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SavedListings;