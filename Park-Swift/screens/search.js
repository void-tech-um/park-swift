import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import HamburgerMenu from './hamburgerMenu.js';

const MenuSearchBar = ({ showSearchBar = true }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles_searchbar.container}>
            <TouchableOpacity style={styles_searchbar.iconContainer}>
                <MaterialCommunityIcons name="menu" color={'white'} size={48} onPress={toggleMenu} />
            </TouchableOpacity>
            <HamburgerMenu isVisible={isMenuVisible} onClose={toggleMenu} />
            {showSearchBar && (
                <Searchbar
                    placeholder="Search Address"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles_searchbar.input}
                    inputStyle={styles_searchbar.inputText}
                    placeholderTextColor="#A3A3A3"
                />
            )}
        </View>
    );
};

const styles_searchbar = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#052658',
        padding: '3%',
        paddingTop: '12.5%',
    },
    iconContainer: {
        marginLeft: 10,
    },
    input: {
        backgroundColor: '#f5f5f5',
        alignSelf: 'center',
        height: 41,
        width: 303,
        marginLeft: 'auto',
        marginRight: 15,
    },
    inputText: {
        fontSize: 20,
        marginVertical: -10,
    },
});

export default MenuSearchBar;