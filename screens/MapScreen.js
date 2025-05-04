import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { getAllPosts } from '../firebaseFunctions/firebaseFirestore';
import MenuSearchBar from '../components/MenuSearchBar';
import ListingScreen from './ListingScreen';

const { width, height } = Dimensions.get('window');

const getMapUrl = (lat, lng, posts) => {
  const markers = posts
    .filter(post => post.latitude && post.longitude)
    .map(post =>
      `&markers=color:red%7Clabel:P%7C${post.latitude},${post.longitude}`
    )
    .join('');

  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=600x600&scale=2&maptype=roadmap${markers}&key=YOUR_GOOGLE_MAPS_API_KEY`;
};

const MapScreen = ({ route }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isListingScreenVisible, setIsListingScreenVisible] = useState(false);
  const [currentParams, setCurrentParams] = useState(null);

  useEffect(() => {
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

    const fetchListings = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchUserLocation();
    fetchListings();
  }, []);

  const openListing = (currentPost) => {
    const params = {
      id: currentPost.id,
      address: currentPost.location,
      startDate: currentPost.firstDate || null,
      endDate: currentPost.lastDate || null,
      startTime: currentPost.startTime || null,
      endTime: currentPost.endTime || null,
      ppHour: currentPost.price && currentPost.rentalPeriod
        ? `$${currentPost.price} /${currentPost.rentalPeriod}`
        : null,
      isNegotiable: currentPost.negotiable ? 'Negotiable' : 'Fixed Price',
      carSize: currentPost.sizeOfCar || "Size not specified",
      userID: currentPost.userID,
      postID: currentPost.postID,
    };

    setCurrentParams(params);
    setIsListingScreenVisible(true);
  };

  if (!userLocation) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MenuSearchBar />
      <WebView
        source={{ uri: getMapUrl(userLocation.latitude, userLocation.longitude, posts) }}
        style={{ flex: 1 }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      <Modal
        animationType='slide'
        transparent={false}
        visible={isListingScreenVisible}
        onRequestClose={() => setIsListingScreenVisible(false)}
        presentationStyle={'pageSheet'}
      >
        <ListingScreen
          route={{
            params: currentParams,
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
