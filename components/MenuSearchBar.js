import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import HamburgerMenu from './HamburgerMenu.js';

const { width } = Dimensions.get('window');

const API_KEY = 'AIzaSyDy0sdb0KP2qAp9bQbYT1NeOAucFyCBI1w'; // Replace with your correct API Key

const MenuSearchBar = ({ showSearchBar = true }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const fetchAddressSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }
    
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${API_KEY}&types=address`
            );
            const json = await response.json();
            console.log("API Response:", json); // Debug log
    
            if (json.error_message) {
                console.error("Google API Error:", json.error_message);
            }
    
            if (json.predictions) {
                setSuggestions(json.predictions);
            } else {
                console.log("No predictions returned.");
            }
        } catch (error) {
            console.error("Network or API Error:", error);
        }
    };    

    const handleSelectAddress = (address) => {
        setSearchQuery(address);
        setSelectedAddress(address);
        setSuggestions([]);
    };

    return (
        <TouchableWithoutFeedback onPress={() => setSuggestions([])}>
            <View style={styles_searchbar.container}>
                <TouchableOpacity style={styles_searchbar.iconContainer} onPress={toggleMenu}>
                    <MaterialCommunityIcons name="menu" color={'white'} size={48} />
                </TouchableOpacity>
                <HamburgerMenu isVisible={isMenuVisible} onClose={toggleMenu} />
                
                {showSearchBar && (
                    <View style={{ flex: 1 }}>
                        <Searchbar
                            placeholder="Search Address"
                            onChangeText={(query) => {
                                setSearchQuery(query);
                                fetchAddressSuggestions(query);
                            }}
                            value={searchQuery}
                            style={styles_searchbar.input}
                            inputStyle={styles_searchbar.inputText}
                            placeholderTextColor="#A3A3A3"
                        />
                        {suggestions.length > 0 && (
                            <View style={styles_searchbar.suggestionsContainer}>
                                <FlatList
                                    data={suggestions}
                                    keyExtractor={(item) => item.place_id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleSelectAddress(item.description)}>
                                            <Text style={styles_searchbar.suggestionItem}>{item.description}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
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
        width: width * 0.70,
        marginLeft: 'auto',
        marginRight: '4.5%',
    },
    inputText: {
        fontSize: 20,
        marginVertical: -10,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 45,
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 1000,
        elevation: 5,
        borderRadius: 5,
        overflow: 'hidden',
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        fontSize: 16,
    },
});

export default MenuSearchBar;
