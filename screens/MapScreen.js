import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Dimensions,Image, TextInput, Button,} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MenuSearchBar from '../components/MenuSearchBar.js';

const { width, height } = Dimensions.get('window');
const markerSize = Math.min(width, height) * 0.1; 

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pinLocation, setPinLocation] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        setErrorMsg('Error fetching location');
        console.error(error);
      }
    })();
  }, []);

  const handleGeoCode = async () => {
    if (!searchQuery.trim()) {
      setErrorMsg('Please enter a valid address');
      return;
    }

    try {
      console.log('Attempting to geocode:', searchQuery);
      const geocodedLocation = await Location.geocodeAsync(searchQuery.trim());
      console.log('Geocoding result:', geocodedLocation);
      
      if (geocodedLocation.length > 0) {
        const { latitude, longitude } = geocodedLocation[0];
        setPinLocation({ latitude, longitude });
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, 1000);
        }
      } else {
        setErrorMsg('No location found for this address');
      }
    } catch (error) {
      console.error('Geocoding Error:', error);
      setErrorMsg('Error in geocoding');
    }
  };

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!userLocation) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MenuSearchBar 
        showSearchBar
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onSubmitEditing={handleGeoCode}
      />
      
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={userLocation} title="You are here">
          <View>
            <Image
              source={require('../assets/user-marker.png')}
              style={{ width: markerSize, height: markerSize }}
            />
          </View>
        </Marker>
        {pinLocation && (
          <Marker coordinate={pinLocation} title="Pinned Location">
            <View>
              <Image
                source={require('../assets/pin-marker.png')}
                style={{ width: markerSize, height: markerSize }}
              />
            </View>
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

export default MapComponent;
