import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Searchbar } from 'react-native-paper';
//import HamburgerMenu from './HamburgerMenu.js';

const { width } = Dimensions.get('window');

const API_KEY = 'AIzaSyC5Fz0BOBAJfvvMwmGB27hJYRhFNq7ll5w'; // Your correct API key

const MenuSearchBar = ({ showSearchBar = true }) => {
    //const [isMenuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    {/*const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    }; */}

    const fetchAddressSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }
    
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${API_KEY}&types=geocode&components=country:us`;
    
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log("API Response:", json);
    
            if (json.predictions) {
                setSuggestions(json.predictions);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
        }
    };  

    const handleSelectAddress = (address) => {
        setSearchQuery(address);
        setSuggestions([]);
    };

    return (
        <TouchableWithoutFeedback onPress={() => setSuggestions([])}>
            <View style={styles_searchbar.container}>
                {/*<TouchableOpacity style={styles_searchbar.iconContainer} onPress={toggleMenu}>
                    <MaterialCommunityIcons name="menu" color={'white'} size={48} />
                </TouchableOpacity>
                <HamburgerMenu isVisible={isMenuVisible} onClose={toggleMenu} />*/}

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
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity onPress={() => handleSelectAddress(item.description)}>
                                            <Text style={[
                                                styles_searchbar.suggestionItem,
                                                index === suggestions.length - 1 && { borderBottomWidth: 0 } // Remove border for last item
                                            ]}>
                                                {item.description}
                                            </Text>
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
        paddingTop: '11.5%',
        height: 110,
        zIndex: 2,
    },
    input: {
        backgroundColor: '#FFF',
        alignSelf: 'center',
        height: 41,
        width: width * 0.90,
    },
    inputText: {
        fontSize: 16,
        marginVertical: -10,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 45,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        fontSize: 16,
    },
});

export default MenuSearchBar;
