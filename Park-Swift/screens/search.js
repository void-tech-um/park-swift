import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 



const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const handleSearch = (text) => {
        setSearchText(text);
    };
    
    return (
        <View style = {styles_searchbar.container}>

        <TouchableOpacity style={styles_searchbar.iconContainer}>

            
        <AntDesign name="menuunfold" size={24} color="white" />
      </TouchableOpacity>

      <TextInput 
        style = {styles_searchbar.input}
        placeholder = "Search address"
        placeholderTextColor = "gray"
        onChangeText = {handleSearch}
        value = {searchText}
    />

    <TouchableOpacity style = {styles_searchbar.iconContainer}>
        <Ionicons name = "ios-funnel-outline" size = {24} color = "white" />
        </TouchableOpacity>
      </View>
    );
    };

    const styles_searchbar = StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#333', // Dark grey background
          padding: 0,
        },
        input: {
          flex: 1,
          height: 40,
          color: 'white', // Text color
          paddingLeft: 10,
        },
        iconContainer: {
          padding: 5,
        },
      });

export default SearchBar;