import React from 'react';
import { View, ScrollView, FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import SearchBar from '../screens/search.js';
import MenuSearchBar from './search';

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
      <View style={{position:"fixed",}}>
         <MenuSearchBar/>
        <View style={{ alignItems: 'center', justifyContent: 'center', top:'-10px', }}>
          <CurrentlyRentingCard />
            {/* Place the "Listings Near You" text right below the CurrentlyRentingCard component */}
            <Text style={styles.listingsNearYouText}>Listings Near You</Text>
            <SortingButton />
            <Text style={styles.listingsNearYouText}>Listings Near You</Text>
              <SortingButton />
            </View>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            >
              <React.Fragment>
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
              </React.Fragment>
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
  listingsNearYouText: {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 180, // Add a little space above the text if needed
    fontSize: 25,
    marginLeft: -220,
  },
  // No additional or complex styling to affect layout
});

export default HomeScreen;