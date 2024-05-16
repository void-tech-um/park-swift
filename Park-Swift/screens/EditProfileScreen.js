import React from 'react';
import StarRating from '../components/StarRating';
import { View, Text, StyleSheet,TextInput, TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import {getUser}  from '../firebaseFunctions/firebase';
import List_Header from '../components/List_Header';
import { set } from 'firebase/database';
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from '../firebaseFunctions/firebase';
import { setUser } from '../firebaseFunctions/firebase';
const auth=getAuth();


function EditProfileScreen({onPress,route}) {
  const [myUser, setMyUser] = useState(null);
  const [email, setEmail] = React.useState(null);
  const [name,setName]=React.useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const navigation = useNavigation();

  //   const handlePress = () => {
  //       onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //           const uid = user.uid;
  //           const userRef = database.ref(`users/${uid}`);
  //           userRef.update({
  //               fullName: name,
  //               email: email
  //           }).then(() => {
  //               // Data updated successfully
  //               console.log('User data updated successfully');
  //               // Navigate to another screen or perform any other action
  //               navigation.navigate('Profile'); // Example navigation to profile screen
  //           }).catch((error) => {
  //               // An error occurred while updating data
  //               console.error('Error updating user data:', error);
  //           });
  //       } else {
  //           // User is signed out
  //           // Handle signed out state if needed
  //       }
  //   });
        
  // };

// Inside EditProfileScreen component
const handlePress = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, update user data
            const uid = user.uid;
            // Call setUser function to update user data
            setUser(uid, { fullName: name, email: email })
                .then(() => {
                    // Data updated successfully
                    console.log('User data updated successfully');
                    // Navigate to another screen or perform any other action
                    navigation.navigate('Profile'); // Example navigation to profile screen
                })
                .catch((error) => {
                    // An error occurred while updating data
                    console.error('Error updating user data:', error);
                });
        } else {
            // User is signed out
            // Handle signed out state if needed
        }
    });
};
  
  
  const userId = route.params.userId;
  useEffect(() => {
    getUser(userId)
        .then((userData) => {
          setMyUser(userData);
          setEmail(userData.email);
          setName(userData.fullName);
        })
        .catch((error) => {
            console.error('Error fetching profile:', error);
        });
  }, [userId, isUpdated]);

  if (!myUser) {
    return <Text>Loading...</Text>;
  }



  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      <List_Header/>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>img</Text>
        </View>
        {/* <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"> */}
        <View>
          <Text style={styles.email}>Name</Text>
        </View>
        <View
          style={styles.input}>
          <TextInput
          editable
          onChangeText={setName}
          value={name}
          style={{padding: 10}}
        />
        </View>
        <View>
          <Text style={styles.email}>Bio</Text>
        </View>
        <View
          style={styles.input}>
          <TextInput
          editable
          style={{padding: 10}}
        />
        </View>
        
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
        
        </View>
      </View>
      </KeyboardAwareScrollView>

      
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#ECF0F3',
  },
  body: {
    marginTop:100,
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
    marginBottom:25,
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
    paddingBottom:20,
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
  input: {
    width:250,
    backgroundColor:"white",
    margin:20,
    borderRadius:20,
    padding:5,
    marginTop:10,
  },
  email:{
    width:220,
  },
  button: {
    marginTop:25,
    backgroundColor: '#033566',
    padding: 15,
    borderRadius: 50,
    width:200,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditProfileScreen;