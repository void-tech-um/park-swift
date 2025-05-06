import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { getAllPosts } from '../firebaseFunctions/firebaseFirestore';
import MenuSearchBar from '../components/MenuSearchBar';
import ListingScreen from './ListingScreen';

const API_KEY = 'AIzaSyC5Fz0BOBAJfvvMwmGB27hJYRhFNq7ll5w';
const { width, height } = Dimensions.get('window');

// 🧠 Function to generate HTML for interactive map
const getInteractiveMapHtml = (lat, lng, posts, apiKey) => {
  const markersJS = posts
    .filter(post => post.latitude && post.longitude)
    .map(
      post => `new google.maps.Marker({ position: { lat: ${post.latitude}, lng: ${post.longitude} }, map });`
    )
    .join('\n');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <style>
          html, body, #map {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          .gm-style-mtc button {
            color: black !important;
            font-weight: bold !important;
            opacity: 1 !important;
          }

        </style>
        <script src="https://maps.googleapis.com/maps/api/js?key=${apiKey}"></script>
        <script>
          function initMap() {
          const center = { lat: ${lat}, lng: ${lng} };
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 17,
            center: center,
            minZoom: 3,
            gestureHandling: "greedy", 
          });

          // 👤 User location marker (blue dot)
          new google.maps.Marker({
            position: center,
            map: map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "white"
            }
          });

          // 🟢 360-degree visual radius
          new google.maps.Circle({
            strokeColor: "#4285F4",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#4285F4",
            fillOpacity: 0.2,
            map: map,
            center: center,
            radius: 20 // in meters — adjust to make larger/smaller
          });

          // 📍 Other listing markers
          ${markersJS}
        }
        </script>
      </head>
      <body onload="initMap()">
        <div id="map"></div>
      </body>
    </html>
  `;
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
  console.log(getInteractiveMapHtml(userLocation.latitude, userLocation.longitude, posts, API_KEY));

  return (
    <View style={styles.container}>
      <MenuSearchBar />
      <WebView
        originWhitelist={['*']}
        source={{
          html: getInteractiveMapHtml(userLocation.latitude, userLocation.longitude, posts, API_KEY),
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{ flex: 1 }}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isListingScreenVisible}
        onRequestClose={() => setIsListingScreenVisible(false)}
        presentationStyle="pageSheet"
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
