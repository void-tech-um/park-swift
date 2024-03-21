import * as React from 'react';
import {View,Text} from 'react-native';
import Profile_Header from '../components/Profile_Header';
import { StyleSheet } from 'react-native';
import List_Header from '../components/List_Header';
import StarRating from '../components/StarRating';

function ProfileScreen() {
    return (
      <View>
        <List_Header/>
        <View style={{position:'relative',top:'15%'}}>
        <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>img</Text>
        </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Your Name</Text>
            </View>
            <View style={styles.star}>
            <StarRating/>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.bioText}>Hello, I am your name</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoText}>your@email.com</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Contact:</Text>
              <Text style={styles.infoText}>your contact</Text>
            </View>
          </View>
        </View>
        </View>
      </View>
      
    );
  };


  // return (
  //   <View style={styles.container}>
  //     <Profile_Header/>
  //     <View style={styles.body}>
  //       <View style={styles.avatarContainer}>
  //         <Text style={styles.avatar}>img</Text>
  //       </View>
  //           <View style={styles.nameContainer}>
  //             <Text style={styles.name}>Your Name</Text>
  //           </View>
  //           <View style={styles.star}>
  //           <StarRating/>
  //           </View>
  //           <View style={styles.infoContainer}>
  //             <Text style={styles.bioText}>Hello, I am your name</Text>
  //           </View>
  //           <View style={styles.infoContainer}>
  //             <Text style={styles.infoLabel}>Email:</Text>
  //             <Text style={styles.infoText}>your@email.com</Text>
  //           </View>
  //           <View style={styles.infoContainer}>
  //             <Text style={styles.infoLabel}>Contact:</Text>
  //             <Text style={styles.infoText}>your contact</Text>
  //           </View>
  //         </View>
  //       </View>
  //     );
    // };

  const styles = StyleSheet.create({
    container: {
      top:'-20%',
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