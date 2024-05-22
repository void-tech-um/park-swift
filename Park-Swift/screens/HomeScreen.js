import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from 'react-native';
import SortingButton from '../components/SortingButton2';
import ListingCard from '../components/ListingCard';
import CurrentlyRentingCard from '../components/CurrentlyRenting';
import MenuSearchBar from './search';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SavedListings from './SavedListings';
import listingsData from '../components/listingsData';
import CustomText from '../components/CustomText';

const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const listingCardHeight = windowHeight * 0.2;

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <MenuSearchBar />
      </TouchableWithoutFeedback>
      <CurrentlyRentingCard />
      <View style={styles.headerContainer}>
        <CustomText style={styles.listingsNearYouText} fontFamily="NotoSansTaiTham-Bold">
          Listings For You
        </CustomText>
        <SortingButton />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + listingCardHeight }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
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
      <SavedListings listingsData={listingsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
});

export default HomeScreen;