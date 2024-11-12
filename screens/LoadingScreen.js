import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';

import loadingLogo from "../assets/shuttle.png";

const LoadingScreen = ({ isLoading }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let animation;
    if (isLoading) {
      animation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        })
      ).start();
    } else { spinValue.setValue(0); }

    return () => animation && animation.stop();
  }, [isLoading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={loadingLogo}
        style={[styles.image, { transform: [{ rotate: spin }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
  },
});

export default LoadingScreen;