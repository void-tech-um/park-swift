import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UnavailableBadge = () => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>Unavailable</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#A8A8A8',
    borderRadius: 17,
    paddingVertical: 3,
    paddingHorizontal: 14,
    position: 'absolute',
    bottom: 11,
    right: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'NotoSansTaiTham-Regular', 
  },
});

export default UnavailableBadge;
