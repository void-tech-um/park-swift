import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const UnavailableBadge = () => {
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

  let paddingVertical = '1%';
  let paddingHorizontal = '4%';
  let fontSize = 14;

  if (screenHeight <= 778 && screenWidth <= 411) {
    paddingVertical = '0.625%';
    paddingHorizontal = '2.5%';
    fontSize = 13;
  }

  return (
    <View style={[styles.badge, { paddingVertical, paddingHorizontal }]}>
      <Text style={[styles.text, { fontSize }]}>Unavailable</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#A8A8A8',
    borderRadius: 17,
    position: 'absolute',
    bottom: 10,
    right: 12,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'NotoSansTaiTham-Regular',
  },
});

export default UnavailableBadge;
