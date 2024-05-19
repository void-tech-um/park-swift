import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, SafeAreaView } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import SearchBar from '../screens/search.js';
import MenuSearchBar from './search';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const listingsData = [
  {
      id: 1,
      address: "419 S State St, Ann Arbor",
      ppHour: "$10.50 /hr",
      date: "11/19/2023",
      startTime: "12:00PM",
      endTime: "3:00PM",
      image: ('/images/landscape.jpg'),
      listingURL: "/",
  },
  {
    id: 2,
    address: "419 S State St, Ann Arbor",
    ppHour: "$10.50 /hr",
    date: "11/19/2023",
    startTime: "12:00PM",
    endTime: "3:00PM",
    image: ('/images/landscape.jpg'),
    listingURL: "/",
  },
  {
    id: 3,
    address: "419 S State St, Ann Arbor",
    ppHour: "$10.50 /hr",
    date: "11/19/2023",
    startTime: "12:00PM",
    endTime: "3:00PM",
    image: ('/images/landscape.jpg'),
    listingURL: "/",
  },
  {
    id: 4,
    address: "419 S State St, Ann Arbor",
    ppHour: "$10.50 /hr",
    date: "11/19/2023",
    startTime: "12:00PM",
    endTime: "3:00PM",
    image: ('/images/landscape.jpg'),
    listingURL: "/",
  },
]

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const listingCardHeight = windowHeight * 0.2; // replace 0.2 with the actual percentage

  return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                          accessible={false}>
          <MenuSearchBar />
        </TouchableWithoutFeedback>
        <CurrentlyRentingCard />
        <View style={styles.headerContainer}>
        <Text style={styles.listingsNearYouText}>Listings For You</Text>
        <SortingButton />
      </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + listingCardHeight }} 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBarContainer: {
    position:"absolute",
    // marginTop: 60,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  listingsNearYouText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  // No additional or complex styling to affect layout
});

export default HomeScreen;