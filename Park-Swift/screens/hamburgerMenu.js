// DropdownMenu.js
import React from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HamburgerMenu = ({ isVisible, onClose }) => {
    const navigation = useNavigation();

    const handleLinkPress = (page) => {
        navigation.navigate(page);
        onClose();
    };
  return (
    <Modal 
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>

        <TouchableOpacity 
            activeOpacity={1} 
            onPressOut={onClose}
            style={styles.container}>

            <View style={styles.modalView}>
                <TouchableWithoutFeedback >
                    <View >
                        {/* keeping all the links to Map for now since Settings, FAQS..etc dont exist yet*/}
                        <TouchableOpacity onPress={() => handleLinkPress("Map")}>
                            <Text style={styles.textStyle}>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleLinkPress("Map")}>
                            <Text style={styles.textStyle}>FAQs</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleLinkPress("Map")}>
                            <Text style={styles.textStyle}>List Parking</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleLinkPress("Map")}>
                            <Text style={styles.textStyle}>About</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableOpacity>   
    </Modal> 
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalView: {
        flex: 1,
        width: Dimensions.get('window').width / 2,
        backgroundColor: '#808080',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'left',
      paddingBottom: Dimensions.get('window').width / 100,
      paddingLeft: Dimensions.get('window').width / 100,
      fontSize: Dimensions.get('window').width / 15,
      textDecorationLine: 'underline'
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
});

export default HamburgerMenu;