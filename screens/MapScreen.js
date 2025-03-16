import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MenuSearchBar from '../components/MenuSearchBar.js';

const { width, height } = Dimensions.get('window');
const markerSize = Math.min(width, height) * 0.1; 

const MapScreen = ({ route }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [listingLocation, setListingLocation] = useState(null);
  
  const { latitude, longitude} = route.params || {};

  useEffect(() => {
    (async () => {
      if (latitude && longitude) {
        // If listing coordinates are provided, use them
        setListingLocation({ latitude, longitude });
      } else {
        // Otherwise, fetch user's current location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        try {
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      }
    })();
  }, [latitude, longitude]);

  if (!userLocation && !listingLocation) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MenuSearchBar />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: listingLocation ? listingLocation.latitude : userLocation.latitude,
          longitude: listingLocation ? listingLocation.longitude : userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="You are here">
            <Image
              source={require('../assets/user-marker.png')}
              style={{ width: markerSize, height: markerSize }}
            />
          </Marker>
        )}

        {listingLocation && (
          <Marker coordinate={listingLocation} title="Listing Location">
            <Image
              source={require('../assets/map-pin.png')}
              style={{ width: markerSize, height: markerSize }}
            />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default MapScreen;
