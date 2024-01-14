import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';

// current tile button
const CurrentTile = () => {
    return (
        <View style={styles.box}>
        <Text style={styles.text}> Currently Viewing: </Text>
      </View>
    );
};

const styles = StyleSheet.create({
    box: {
        color: 'grey',
        
    },

    text: {
        color: 'black'
    },
});


export default CurrentTile;



