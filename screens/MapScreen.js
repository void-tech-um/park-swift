import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getAllPosts } from '../firebaseFunctions/firebaseFirestore';
import MenuSearchBar from '../components/MenuSearchBar.js';
import ListingScreen from './ListingScreen';

const { width, height } = Dimensions.get('window');
const markerSize = Math.min(width, height) * 0.1; 

const MapScreen = ({ route }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [posts, setPosts] = useState([]); // Store listing locations
  const [isListingScreenVisible, setIsListingScreenVisible] = useState(true);

  useEffect(() => {
    // Fetch user's current location
    const fetchUserLocation = async () => {
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
        console.error('Error fetching user location:', error);
      }
    };

    // Fetch all listing locations from Firestore
    const fetchListings = async () => {
      try {
        const allPosts = await getAllPosts(); // Fetch posts from Firestore
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchUserLocation();
    fetchListings();
  }, []);

  if (!userLocation) {
    return <Text>Loading...</Text>;
  }

  const thing = () => {
    console.log('Hello');
  }

  return (
    <View style={styles.container}>
      <MenuSearchBar />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Show user's current location */}
        <Marker coordinate={userLocation} title="You are here">
          <Image
            source={require('../assets/user-marker.png')}
            style={{ width: markerSize, height: markerSize }}
          />
        </Marker>

        {/* Show all listing locations */}
        {posts.map((post, index) => (
          post.latitude && post.longitude ? (
            <Marker 
              key={index}
              coordinate={{ latitude: post.latitude, longitude: post.longitude }} 
              title={post.location}
            >
              <TouchableOpacity onPress={thing}>
                <Image
                  source={require('../assets/map-pin.png')}
                  style={{ width: markerSize, height: markerSize }}
                />
              </TouchableOpacity>
            </Marker>
          ) : null
        ))}
      </MapView>
      <Modal
        animationType='slide'
        transparent={false}
        visible={isListingScreenVisible}
        onRequestClose={() => setIsListingScreenVisible(false)}
      >
        <ListingScreen
          route={{
            params: {
              address: null,
              ppHour: null,
              userID: null,
              postId: null,
              startDate: null,
              endDate: null,
              isAvailable: null,
            }
          }}
        />
      </Modal>
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
