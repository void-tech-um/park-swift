import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon from the library

const FilterScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.filterText}>Filter By:</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => console.log('Time/Date pressed')} style={styles.button}>
                        <Text style={styles.buttonText}>Time/Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Distance pressed')} style={styles.button}>
                        <Text style={styles.buttonText}>Distance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Pricing pressed')} style={styles.button}>
                        <Text style={styles.buttonText}>Pricing</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Mark your location:</Text>
            </View>
            <View style={styles.locationActionContainer}>
                <TouchableOpacity style={styles.circleButton} onPress={() => console.log('Circle button pressed')}>
                    {/* Circle button */}
                </TouchableOpacity>
                <Text style={styles.locationActionText}>Use address:</Text>
            </View>
            <View style={styles.locationButton}>
                <TouchableOpacity onPress={() => console.log('Location pressed')} style={styles.locButton}>
                    <Text style={styles.locButtonText}>123 S Division St, Ann Arbor, MI</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.locationActionContainer}>
                <TouchableOpacity style={styles.circleButton} onPress={() => console.log('Circle button pressed')}>
                    {/* Circle button */}
                </TouchableOpacity>
                <Text style={styles.locationActionText}>Use current location:</Text>
            </View>
            <View style={styles.locationButton}>
                <TouchableOpacity onPress={() => console.log('Location pressed')} style={styles.locButtonWithIcon}>
                    <Icon name="place" size={20} color="gray" />
                    <Text style={styles.locButtonTextWithIcon}>913 S University Ave, Ann Arbor..</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rangeContainer}>
                <Text style={styles.locationText}>Specify Range:</Text>
            </View>
            <View style={styles.rangeActionContainer}>
                <TouchableOpacity style={styles.circleButton} onPress={() => console.log('Circle button pressed')}>
                    {/* Circle button */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton} onPress={() => console.log('Small button pressed')}>
                    <Text style={styles.smallButtonText}>30 minutes</Text>
                </TouchableOpacity>
                <Text style={styles.rangeActionText}>away at most.</Text>
            </View>
            <View style={styles.rangeActionContainer2}>
                <TouchableOpacity style={styles.circleButton} onPress={() => console.log('Circle button pressed')}>
                    {/* Circle button */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton} onPress={() => console.log('Small button pressed')}>
                    <Text style={styles.smallButtonText}>8 miles</Text>
                </TouchableOpacity>
                <Text style={styles.rangeActionText}>away at most.</Text>
            </View>
            <View style={styles.doneButtonContainer}>
                <TouchableOpacity onPress={() => console.log('Done pressed')} style={styles.doneButton}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    container: {
        height: '15%',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4C4C4',
        marginTop: 0,
    },
    filterText: {
        fontSize: 20,
        marginTop: 13,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        backgroundColor: '#464646',
        padding: 10,
        borderRadius: 13,
        alignItems: 'center',
        marginHorizontal: 2,
        marginBottom: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    locationContainer: {
        width: '90%',
        marginTop: 8,
        alignSelf: 'center',
    },
    locationText: {
        fontSize: 20,
        marginTop: 15,
        fontWeight: 'bold',
    },
    locationActionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        width: '85%',
        alignSelf: 'center',
    },
    locButtonWithIcon: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 13,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        width: '100%', // This ensures the button fills its container
        justifyContent: 'space-between', // Adjusts the spacing within the button
        marginLeft: 0, // Ensures alignment with other buttons if needed
        marginRight: 0, // Ensures alignment with other buttons if needed
    },
    locButtonTextWithIcon: {
        color: 'gray',
        fontSize: 18,
        marginLeft: 10,
    },
    circleButton: {
        height: 35,
        width: 35,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    locationActionText: {
        fontSize: 18,
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        width: '85%', // This makes sure the button's container is the intended width
        alignSelf: 'center',
    },
    
    locButton: {
        flex: 1,
        backgroundColor: '#464646',
        padding: 10,
        borderRadius: 13,
        alignItems: 'center',
        marginHorizontal: 2,
        marginBottom: 5,
    },
    locButtonText: {
        color: 'white',
        fontSize: 19,
    },
    rangeContainer: {
        width: '90%',
        marginTop: 25,
        alignSelf: 'center',
    },
    rangeActionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        width: '85%',
        alignSelf: 'center',
    },
    rangeActionContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 27,
        width: '85%',
        alignSelf: 'center',
    },
    smallButton: {
        backgroundColor: '#464646',
        width: '50%',
        marginLeft: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    smallButtonText: {
        color: 'white',
        fontSize: 18,
    },
    rangeActionText: {
        fontSize: 18,
    },
    doneButtonContainer: {
        marginTop: 25,
        width: '50%',
        alignSelf: 'center',
    },
    doneButton: {
        backgroundColor: '#C4C4C4',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default FilterScreen;
