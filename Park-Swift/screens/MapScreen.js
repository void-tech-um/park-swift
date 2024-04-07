import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback,Keyboard } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import MenuSearchBar from './search'

const MapScreen = () => {
  const markers = [
    { id: '1', latitude: 42.280826, longitude: -83.743038, title: 'Ann Arbor' }, // Example location
    // Add more markers as needed

  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                          accessible={false}>
    <View>
      <MenuSearchBar/>
      <MapView style={styles.map}>
        <UrlTile
          urlTemplate="http://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
