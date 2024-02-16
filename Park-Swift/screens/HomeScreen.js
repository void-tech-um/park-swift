import * as React from 'react';
import {View} from 'react-native';
import SearchBar from './search';
import CurrentTile from './home';

import ListingCard from '../components/ListingCard.js';

const listingsData = [
  {
      address: 1,
      date: "next.js portfolio website",
      startTime: "project 1 description",
      endTime: "project 1 description",
      image: "/images/landscape.jpg",
      ppHour: "/",
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
          {listingsData.map((listing) => (
            <ListingCard
              address={listing.address}
              date={listing.date}
              startTime={listing.startTime}
              endTime={listing.endTime}
              image={listing.gitURL}
              launchURL={listing.launchURL}
            />
          ))}
        </React.Fragment>
      </View>
    );
  }

  export default HomeScreen;