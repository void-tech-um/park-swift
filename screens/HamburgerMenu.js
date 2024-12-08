// // DropdownMenu.js
// import React from 'react';
// import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const HamburgerMenu = ({ isVisible, onClose }) => {
//     const navigation = useNavigation();

//     const handleLinkPress = (page) => {
//         navigation.navigate(page);
//         onClose();
//     };
//   return (
//     <Modal 
//         animationType="fade"
//         transparent={true}
//         visible={isVisible}
//         onRequestClose={onClose}>

//         <TouchableOpacity 
//             activeOpacity={1} 
//             onPressOut={onClose}
//             style={styles.container}>

//             <View style={styles.modalView}>
//                 <TouchableWithoutFeedback >
//                     <View style={styles.menu}>
//                         {/* keeping all the links to Map for now since Settings, FAQS..etc dont exist yet*/}
//                         {/* For now, setting button goes to List Info Page */}
//                         <TouchableOpacity onPress={() => handleLinkPress("List Info Page")}> 
//                             <Text style={styles.textStyle}>Settings</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => handleLinkPress("List Info Page")}>
//                             <Text style={styles.textStyle}>List Parking</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => handleLinkPress("List Info Page")}>
//                             <Text style={styles.textStyle}>FAQ</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity onPress={() => handleLinkPress("List Info Page")}>
//                             <Text style={styles.textStyle}>About</Text>
//                         </TouchableOpacity>

//                     </View>
//                 </TouchableWithoutFeedback>
//             </View>
//         </TouchableOpacity>   
//     </Modal> 
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     modalView: {
//         flex: 1,
//         width: Dimensions.get('window').width / 2,
//         backgroundColor: '#ffffff',
//         padding: 0,
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'absolute',
//         left: 0,
//         top: 0,
//         bottom: 0,
//     },
//     menu:{
//         top:"-30%",
//     },
//     textStyle: {
//       color: 'black',
//       textAlign: 'left',
//       left:'-5%',
//       marginBottom:"2%",
//       paddingBottom: Dimensions.get('window').width / 100,
//       paddingLeft: Dimensions.get('window').width / 100,
//       fontSize: Dimensions.get('window').width / 15,
//     },
//     modalText: {
//       marginBottom: 15,
//       textAlign: 'center',
//     },
// });

// export default HamburgerMenu;

import React from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

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
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                activeOpacity={1} 
                onPressOut={onClose} 
                style={styles.container}
            >
                <View style={styles.modalView}>
                    <TouchableWithoutFeedback>
                        <View style={styles.menu}>
                            {/* Menu items */}
                            <TouchableOpacity style={styles.menuItem} onPress={() => handleLinkPress("Settings")}>
                                <View style={styles.menuItemContent}>
                                    <Ionicons name="settings-outline" size={24} color="#FFFFFF" style={styles.icon} />
                                    <Text style={styles.textStyle}>Settings</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={() => handleLinkPress("List Parking")}>
                                <View style={styles.menuItemContent}>
                                    <Ionicons name="location-outline" size={24} color="#FFFFFF" style={styles.icon} />
                                    <Text style={styles.textStyle}>List Parking</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={() => handleLinkPress("FAQ")}>
                                <View style={styles.menuItemContent}>
                                    <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" style={styles.icon} />
                                    <Text style={styles.textStyle}>FAQ</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={() => handleLinkPress("About")}>
                                <View style={styles.menuItemContent}>
                                    <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" style={styles.icon} />
                                    <Text style={styles.textStyle}>About</Text>
                                </View>
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
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Slight dark overlay for modal
    },
    modalView: {
        flex: 1,
        width: Dimensions.get('window').width / 1.5,  // Modal width increased for a better view
        backgroundColor: '#ffffff',
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,  // Rounded corners for a sleek look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    menu: {
        width: '100%',
    },
    menuItem: {
        marginVertical: 10,  // Added vertical margin between items
        paddingVertical: 10,
        width: '100%',
        borderRadius: 8,  // Slightly rounded corners for items
        backgroundColor: '#052658',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
    },
    menuItemContent: {
        flexDirection: 'row',  // Ensures that icon and text are aligned horizontally
        alignItems: 'center',  // Centers the icon and text vertically
    },
    icon: {
        marginRight: 15,  // Adds space between icon and text
    },
    textStyle: {
        fontSize: 23,
        color: '#FFFFFF',  // Darker color for better contrast
        fontWeight: '600',  // Slightly bolder text for readability
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'NotoSansTaiTham-Regular', 
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default HamburgerMenu;
