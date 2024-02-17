import * as React from 'react';
import {View} from 'react-native';
import SearchBar from './search';
import CurrentTile from './home';

import ListingCard from '../components/ListingCard.js';

const listingsData = [
  {
      address: "505 S State",
      date: "01/01/24",
      startTime: "01/01/24",
      endTime: "01/01/24",
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
          <View>
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
          </View>
        </React.Fragment>
      </View>
    );
  }

  export default HomeScreen;