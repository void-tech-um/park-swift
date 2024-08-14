import {React, useState} from 'react';
import { View, Pressable, Text, StyleSheet, TouchableOpacity, Button , TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import List_Header from '../components/List_Header';
import RNPickerSelect from 'react-native-picker-select';
import { Calendar } from 'react-native-calendars';


const FilterScreen = ({route}) => {

    const { setDate, setTime, setMinPrice, setMaxPrice, setBeginDate, setEndDate} = route.params;
    const [minNumber, onChangeMinNumber] = useState('');
    const [maxNumber, onChangeMaxNumber] = useState('');
    const [selectedDates, setSelectedDates] = useState({});
    const [firstDate, setFirstDate] = useState(null);
    const [lastDate, setLastDate] = useState(null);
    const [rentalPeriod, setRentalPeriod] = useState('hour');

    const navigation = useNavigation();

    const filterPress = () => {
        setMinPrice(minNumber);
        setMaxPrice(maxNumber);
        
        setBeginDate(firstDate);
        setEndDate(lastDate);
    }

    const resetPress = () => {
        setMinPrice(null);
        setMaxPrice(null);
        setBeginDate(null);
        setEndDate(null);
        console.log("reset filter");
    }

    const handleDayPress = (day) => {
        if (!firstDate || (firstDate && lastDate)) {
          setFirstDate(day.dateString);
          setLastDate(null); 
          setSelectedDates({ [day.dateString]: { selected: true, selectedColor: 'grey' } });
        } else if (firstDate && !lastDate) {
          setLastDate(day.dateString);
          if (new Date(day.dateString) < new Date(firstDate)) {
            fillDatesBetween(day.dateString, firstDate); 
          } else {
            fillDatesBetween(firstDate, day.dateString);
          }
        }
      };
      const fillDatesBetween = (startDate, endDate) => {
        let start = new Date(startDate);
        let end = new Date(endDate);
        end.setDate(end.getDate() + 1); 
        const datesToMark = {};
      
        while (start < end) {
          const dateString = start.toISOString().split('T')[0];
          datesToMark[dateString] = { selected: true, selectedColor: 'grey' };
          start.setDate(start.getDate() + 1);
        }
      
        setSelectedDates(datesToMark);
      };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <List_Header />
            </View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={40} color="white" />
                </TouchableOpacity>
                <Text style={styles.listingHeading}>Filter</Text>
            </View>

            <ScrollView 
                horizontal={false} 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ width: '100%' }}
            >
                <View style={styles.container}>
                    {/* <Text style={styles.filterText}>Filter By:</Text> */}

                    <View style={styles.buttonsContainer}>

                        <Pressable onPress={resetPress}>
                            <Text style={styles.resetButton}> Reset Filter</Text>
                        </Pressable>
                        {/* <TouchableOpacity onPress={() => console.log('Time/Date pressed')} style={styles.button}>
                            <Text style={styles.buttonText}>Time/Date</Text>
                        </TouchableOpacity> */}
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeMinNumber}
                            value={minNumber}
                            placeholder="Min"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeMaxNumber}
                            value={maxNumber}
                            placeholder="Max"
                            keyboardType="numeric"
                        />

                    {/* <RNPickerSelect
                        onValueChange={(value) => setRentalPeriod(value)}
                        items={[
                            { label: 'Hour', value: 'hour' },
                            { label: 'Day', value: 'day' },
                            { label: 'Week', value: 'week' },
                            { label: 'Month', value: 'month' },
                        ]}
                        style={pickerSelectStyles}
                        value={rentalPeriod}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{}}
                        Icon={() => {
                            return <MaterialCommunityIcons name="triangle" size={20} color="lightgrey" style={{ alignSelf: 'center', marginRight: 10, transform: [{ rotate: '180deg' }] }} />;
                        }}
                    /> */}

                    <Calendar
                        style={styles.calendarStyle}
                        onDayPress={(day) => handleDayPress(day)}
                        markedDates={selectedDates}
                    />

                        {/* <TouchableOpacity onPress={() => console.log('Distance pressed')} style={styles.button}>
                            <Text style={styles.buttonText}>Distance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('Pricing pressed')} style={styles.button}>
                            <Text style={styles.buttonText}>Pricing</Text>
                        </TouchableOpacity> */}
                    </View>
                    </View>
                {/* <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>Mark your location:</Text>
                </View>
                <View style={styles.locationActionContainer}>
                    <TouchableOpacity style={styles.circleButton} onPress={() => console.log('Circle button pressed')}>
                        {}
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
                        {}
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
                        {}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton} onPress={() => console.log('Small button pressed')}>
                        <Text style={styles.smallButtonText}>30 minutes</Text>
                    </TouchableOpacity>
                    <Text style={styles.rangeActionText}>away at most.</Text>
                </View>
                <View style={styles.rangeActionContainer2}>
                    <TouchableOpacity style={styles.circleButton} onPress={() => console.log('Circle button pressed')}>
                        {}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton} onPress={() => console.log('Small button pressed')}>
                        <Text style={styles.smallButtonText}>8 miles</Text>
                    </TouchableOpacity>
                    <Text style={styles.rangeActionText}>away at most.</Text>
                </View> */}
                <View style={styles.doneButtonContainer}>
                    <TouchableOpacity onPress={filterPress} style={styles.doneButton}>
                        <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'transparent',
      borderRadius: 15,
      color: 'black',
      paddingRight: 30,
      backgroundColor: '#f0f0f0',
      height: 45,
      marginTop: 6,
      width: 125,
    
     
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'transparent',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      backgroundColor: '#f0f0f0',
      height: 45,
      marginTop: -5,
      width: 125,
    },
    iconContainer: {
      top: '50%',
      right: 0,
      transform: [{ translateY: -10 }], 
    },
    button: {
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 12,
     paddingHorizontal: 32,
     borderRadius: 4,
     elevation: 3,
     backgroundColor: 'black',
   },
   text: {
     fontSize: 16,
     lineHeight: 21,
     fontWeight: 'bold',
     letterSpacing: 0.25,
     color: 'white',
   },
   });

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    resetButton: {
        textAlign:'right',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 0,
        width: '100%'
    },
    container: {
        height: '100%', //Change For Now.
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
        flexDirection: 'column',
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
    // topHeader: {
    //     flexDirection: 'row',
    //     backgroundColor: '#333', // dark grey background for top header
    //     padding: 10,
    //     height: 100,
    // },
    listingHeading: {
        marginLeft: 8, // space between arrow and address title
        fontSize: 30,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // aligns the items to the start of the main axis
        width: '100%',
        padding: 20, // Add some padding around the header
    },
    backButton: {
        backgroundColor: '#0653a1',
        borderRadius: 100, // makes the button circular
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10, // adds some space between the button and the next element
        marginRight: 20, // Add some space to the right of the button
    },
    headerContainer: {
        width: '100%', // Ensures the headerContainer takes the full width
    },
});

export default FilterScreen;
