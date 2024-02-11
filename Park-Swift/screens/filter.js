import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
                    {/* You can include icon or text inside TouchableOpacity if needed */}
                </TouchableOpacity>
                <Text style={styles.locationActionText}>Use address:</Text>
            </View>
            <View style={styles.locationButton}>
                <TouchableOpacity onPress={() => console.log('Location pressed')} style={styles.locButton}>
                    <Text style={styles.locButtonText}>123 S Division St, Ann Arbor, MI</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.locationCurrActionContainer}>
                <TouchableOpacity style={styles.circleButton} onPress={() => console.log('Circle button pressed')}>
                    {/* You can include icon or text inside TouchableOpacity if needed */}
                </TouchableOpacity>
                <Text style={styles.locationActionText}>Use Current Location:</Text>
            </View>
            <View style={styles.locationButton}>
                <TouchableOpacity onPress={() => console.log('Location pressed')} style={styles.locButton}>
                    <Text style={styles.locButtonText}>913 S University Ave, Ann Arbor..</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rangeContainer}>
                <Text style={styles.locationText}>Specify Range:</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // Ensures the main container takes the full screen, adjust as needed
        flex: 1,
        alignItems: 'center', // Aligns children components to the center horizontally
        paddingTop: 20, // Aligns children components to the center vertically
    },
    container: {
        height: '15%', // Adjusted as per your setting
        width: '90%', // Spans most of the width of the page
        alignSelf: 'center', // Center the box horizontally
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
        backgroundColor: '#C4C4C4', // Example background color
        marginTop: 0, // Add some margin at the top
    },
    filterText: {
        fontSize: 20,
        marginTop: 13,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row', // Arrange buttons in a row
        width: '100%', // Use 100% of the container width for the buttons
        padding: 10, // Add padding to create space against the container's ends
        justifyContent: 'space-between', // This will be overridden by flex anyway, but good for fallback
    },
    button: {
        flex: 1, // Equal width for each button
        backgroundColor: '#464646',
        padding: 10,
        borderRadius: 13,
        alignItems: 'center',
        marginHorizontal: 2, // Horizontal margin to keep space between buttons
        marginBottom: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    locationContainer: {
        width: '90%', // Match the container width
        marginTop: 8, // Space between the gray box and this text
        alignSelf: 'center', // Align with the container
    },
    locationText: {
        fontSize: 20, // Adjust size as needed
        marginTop: 20, // Space between the gray box and this text
        fontWeight: 'bold', // Make it stand out
    },
    locationActionContainer: {
        flexDirection: 'row', // Aligns button and text horizontally
        alignItems: 'center', // Centers items vertically within the container
        marginTop: 25, // Adjust as needed for spacing from the "Mark your location:" text
        width: '85%', // Match the container width for alignment
        alignSelf: 'center', // Ensure alignment matches with the above container
    },
    circleButton: {
        height: 35, // Circle size
        width: 35, // Circle size
        borderRadius: 20, // Half of height and width to make it circular
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center', // Center content inside the button vertically
        alignItems: 'center', // Center content inside the button horizontally
        marginRight: 10, // Space between the button and the text
    },
    locationActionText: {
        fontSize: 18, // Adjust as needed
        // Add additional styling for the text as needed
    },
    locationButton: {
        flexDirection: 'row', // Aligns button and text horizontally
        alignItems: 'center', // Centers items vertically within the container
        marginTop: 12, // Adjust as needed for spacing from the "Mark your location:" text
        width: '85%', // Match the container width for alignment
        alignSelf: 'center', // Ensure alignment matches with the above container
    },
    locButton: {
        flex: 1, // Equal width for each button
        backgroundColor: '#464646',
        padding: 12,
        borderRadius: 13,
        alignItems: 'center',
        marginHorizontal: 2, // Horizontal margin to keep space between buttons
        marginBottom: 5,
    },
    locButtonText: {
        color: 'white',
        fontSize: 19,
    },
    locationCurrActionContainer: {
        flexDirection: 'row', // Aligns button and text horizontally
        alignItems: 'center', // Centers items vertically within the container
        marginTop: 15, // Adjust as needed for spacing from the "Mark your location:" text
        width: '85%', // Match the container width for alignment
        alignSelf: 'center', // Ensure alignment matches with the above container
    },
    rangeContainer: {
        width: '90%', // Match the container width
        marginTop: 25, // Space between the gray box and this text
        alignSelf: 'center', // Align with the container
    },

});

export default FilterScreen;
