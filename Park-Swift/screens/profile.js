import React from 'react';
import StarRating from '../components/StarRating';
import { View, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-screens';
import { useState, useEffect } from 'react';
import {getUser}  from '../firebaseFunctions/firebase';

function ProfileScreen({route}) {
  const [myUser, setMyUser] = useState(null);
  const userId = route.params.userId;
  useEffect(() => {
    getUser(userId)
        .then((userData) => {
          setMyUser(userData);
        })
        .catch((error) => {
            console.error('Error fetching profile:', error);
        });
  }, [userId]);

  if (!myUser) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>img</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{myUser.fullName}</Text>
        </View>
        <View style={styles.star}>
        <StarRating/>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.bioText}>Hello, I am your name</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>{myUser.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Contact:</Text>
          <Text style={styles.infoText}>{myUser.email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ECF0F3',
  },
  body: {
    marginTop:120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 72,
    fontWeight: '700',
  },
  nameContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 40,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#666666',
    marginRight: 8,
  },
  infoText: {
    fontSize: 24,
  },
  star:{
    marginTop:20,
    marginBottom:10,
  },
  bioText:{
    fontSize: 20,
    color:'#666666',
  },
});

export default ProfileScreen;