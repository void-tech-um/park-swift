import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MenuSearchBar from './search';

const MapScreen = () => {
  const markers = [
    { id: '1', latitude: 42.280826, longitude: -83.743038, title: 'Ann Arbor' }, 
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <MenuSearchBar />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 42.280826,
            longitude: -83.743038,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
            />
          ))}
        </MapView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
