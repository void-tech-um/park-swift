import * as React from 'react';
import {View, ScrollView, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import SearchBar from './search';
import CurrentTile from './home';

import ListingCard from '../components/ListingCard.js';

const listingsData = [
  {
      id: 1,
      address: "505 S State",
      date: "01/01/24",
      startTime: "12pm",
      endTime: "3pm",
      image: "/images/landscape.jpg",
      ppHour: "500",
      listingURL: "/",

  },
  {
    id: 2,
    address: "505 S State",
    date: "01/01/24",
    startTime: "12pm",
    endTime: "3pm",
    image: "/images/landscape.jpg",
    ppHour: "500",
    listingURL: "/",

  },
  {
    id: 3,
    address: "505 S State",
    date: "01/01/24",
    startTime: "12pm",
    endTime: "3pm",
    image: "/images/landscape.jpg",
    ppHour: "500",
    listingURL: "/",

  },
  {
    id: 4,
    address: "505 S State",
    date: "01/01/24",
    startTime: "12pm",
    endTime: "3pm",
    image: "/images/landscape.jpg",
    ppHour: "500",
    listingURL: "/",

  },
]


function HomeScreen() {
    // adding currentTile and search bar components
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <React.Fragment>
          <SearchBar/>
          <CurrentTile/>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, padding: 0, alignItems: 'stretch'}}
          >
            {listingsData.map((listing) => (
              <ListingCard
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

          {/* <SafeAreaView>
          <FlatList
            data={listingsData}
            keyExtractor={listing => listing.id}
            contentContainerStyle={styles.listingCards}
            numColumns={1} // Set to 1 column
            renderItem={({ listing }) => (
              <ListingCard
                // address={listing.address}
                // date={listing.date}
                // startTime={listing.startTime}
                // endTime={listing.endTime}
                // image={listing.gitURL}
                // launchURL={listing.launchURL}
              />
            )}
          />
        </SafeAreaView> */}
        </React.Fragment>
      </View>
    );
  }

  export default HomeScreen;