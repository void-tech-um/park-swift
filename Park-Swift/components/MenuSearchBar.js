import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import HamburgerMenu from './HamburgerMenu.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Searchbar} from 'react-native-paper';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';


const MenuSearchBar = () => {
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
          <Searchbar
              lightTheme
              placeholder="Search"
              onChangeText={setSearchQuery}
              inputStyle={{top:'-2.5%'}}
              value={searchQuery}
              style={styles_searchbar.input}
          />
          {/* <TextInput 
            style = {styles_searchbar.input}
            placeholder = "Search address"
            placeholderTextColor = "black"
            onChangeText = {handleSearch}
            value = {searchText}
          /> */}
        </View>
    );
  };

    const styles_searchbar = StyleSheet.create({
        container: {
          position:'flex',
          justifyContents:'space-around',
          flexDirection: 'row',
          alignItems: 'left',
          backgroundColor: '#033566', // Dark grey background
          padding: '3%',
          paddingTop:'12.5%',
        },
        input: {
          flex: 8,
          backgroundColor: '#f5f5f5',
          color:'#a3a3a3', 
          alignSelf: 'center',
          height:'98%',
        },
        iconContainer: {
          flex:1,
          padding: 5,
          
        },
      });

export default MenuSearchBar;