import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import HamburgerMenu from '../screens/hamburgerMenu.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Searchbar} from 'react-native-paper';


const Profile_Header = () => {

    const [searchText, setSearchText] = useState('');
    const handleSearch = (text) => {
        setSearchText(text);
    };

    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(!isMenuVisible);
    };
    
    const [searchQuery, setSearchQuery] = React.useState('');
    
    return (
        <View style = {styles_searchbar.container}>
          <TouchableOpacity style={styles_searchbar.iconContainer}>
            <MaterialCommunityIcons name="menu" color={'white'} size={36} onPress={toggleMenu}/>
          </TouchableOpacity>
          <HamburgerMenu isVisible={isMenuVisible} onClose={toggleMenu} />
        </View>
    );
  };

    const styles_searchbar = StyleSheet.create({
        container: {
          position:'flex',          
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#033566', // Navy Background
          padding: '3%',
          paddingTop:'15%',
        },
        iconContainer: {
          flex:1,
          padding: 5,
          right:'15%',
        },
      });

export default Profile_Header;