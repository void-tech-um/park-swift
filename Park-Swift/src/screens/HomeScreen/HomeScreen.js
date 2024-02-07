// import React from 'react'
import { Text, View } from 'react-native'
import React, { useEffect } from 'react';

export default function HomeScreen({navigation, extraData }) {
    useEffect(() => {
        if (extraData === null) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }, [extraData]);
}