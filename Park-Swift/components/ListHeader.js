import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import HamburgerMenu from './HamburgerMenu.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Searchbar} from 'react-native-paper';


const ListHeader = () => {

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
          alignItems: 'left',
          backgroundColor: '#033566', // Dark grey background
          padding: '3%',
          paddingTop:'12.5%',
        },
        iconContainer: {
          padding: 5,
        },
      });

export default ListHeader;