import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListSpaceButton from '../components/ListSpaceButton';
import { createPost } from '../firebaseFunctions/firebaseFirestore';
import { useState } from 'react';
import ListHeader from '../components/ListHeader';


function PostScreen({ navigation, route }) {
  const userId = route.params.userId;
  const [location, setLocation] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [rentalPeriod, setRentalPeriod] = React.useState('hour');
  const [isNegotiable, setIsNegotiable] = React.useState(null);
  const [selectedDates, setSelectedDates] = React.useState({});
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
 
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

 const onPostPress = () => {
  //  alert(userId);
   createPost(userId, location, rentalPeriod, price, isNegotiable, firstDate, lastDate)
     .then(() => {
      navigation.navigate('ThankYou');
     })
     .catch((error) => {
       console.error('Error creating post:', error);
       // Handle the error here, e.g., show an error message to the user
     });
  }
 
  return (
    <View>
      <ListHeader/>
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        <Text style={styles.title}>List Your Space</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.main}>
        <View>
          <Text style={styles.headerText}>Location</Text>
          <View style={styles.inputWithIcon}>
            <MaterialCommunityIcons name="magnify" size={20} color="black" style={styles.iconInsideInput} />
            <TextInput
              style={[styles.inputRounded, styles.inputLocation]}
              placeholder="Address"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <Text style={styles.headerText}>Price</Text>
          <View style={styles.inputWithIcon}>
            <MaterialCommunityIcons name="currency-usd" size={20} color="black" style={styles.iconInsideInput} />
            <TextInput
              style={[styles.inputRounded, styles.inputPrice]}
              keyboardType="numeric"
              placeholder="0.00"
              value={price}
              onChangeText={setPrice}
            />
            <Text style={styles.slash}>/</Text>

            <RNPickerSelect
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
            />
          </View>

          <Text style={styles.headerText}>Negotiable?</Text>
          <View style={styles.negotiableContainer}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setIsNegotiable(true)}>
              <View style={[styles.circle, styles.lightGreyCircle]}>
                {isNegotiable === true && (
                  <MaterialCommunityIcons name="check" size={24} color="black" />
                )}
              </View>
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, styles.noOption]}
              onPress={() => setIsNegotiable(false)}>
              <View style={[styles.circle, styles.lightGreyCircle]}>
                {isNegotiable === false && (
                  <MaterialCommunityIcons name="check" size={24} color="black" />
                )}
              </View>
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.headerText}>Description</Text>
<View style={styles.inputWithIcon}>
  <TextInput
    style={[styles.inputRounded, styles.inputDescription]}
    placeholder="Describe your space"
    multiline
    numberOfLines={4} // Adjust based on your needs
  />
</View>

          <Text style={styles.centeredHeaderText}>Available Dates</Text>
          <Calendar
            style={styles.calendarStyle}
            onDayPress={(day) => handleDayPress(day)}
            markedDates={selectedDates}
          />
        </View>

      <ListSpaceButton style={styles.button} onPress={() => onPostPress()} />

      </View>
      </ScrollView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  //  top:-120,
  //  flex: 1,
   padding: 10,
  // paddingTop: 150,
   backgroundColor: '#fff',
  
 },

 inputDescription: {
  marginRight: 10,
  flex: 1,
  height: 100, 
  marginTop: 6,
  paddingLeft: 10, 
},
 titleRow: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: 20,
 },
 title: {
   fontSize: 30,
   color: 'black',
   fontWeight: 'bold',
   marginLeft: 10,
 },
 headerText: {
   fontSize: 20,
   color: 'black',
   fontWeight: 'bold',
   marginTop: 15,
 },
 inputWithIcon: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop: 20,
  
 },
 iconInsideInput: {
   position: 'absolute',
   marginLeft: 15,
   zIndex: 1,
 },
 inputRounded: {
   borderWidth: 1,
   borderRadius: 20,
   padding: 10,
   backgroundColor: '#f0f0f0',
   fontSize: 16,
   flex: 1,
   height: 50,
   paddingLeft: 45,
   borderColor: 'transparent',
 },
 inputPrice: {
   marginRight: 10,
   flex: 0,
   width: 160,
   height: 45,
   marginTop: 6,
   paddingLeft: 45,
 },
 slash: {
   fontSize: 40,
   color: 'black',
   marginHorizontal: 5,
 },
 negotiableContainer: {
   flexDirection: 'row',
   marginTop: 15,
 },
 option: {
   flexDirection: 'row',
   alignItems: 'center',
   marginRight: 30,
 },
 noOption: {
   marginLeft: 10,
 },
 circle: {
   width: 24,
   height: 24,
   borderRadius: 12,
   borderWidth: 1,
   borderColor: 'transparent',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#f0f0f0',
 },
 optionText: {
   fontSize: 16,
   color: 'black',
   marginLeft: 5,
 },
 centeredHeaderText: {
   fontSize: 20,
   color: 'black',
   fontWeight: 'bold',
   marginTop: 15,
   textAlign: 'center',
 },
 calendarStyle: {
 marginTop: 10,
 color: 'black',
 borderWidth: 1,
 borderColor: '#d3d3d3',
 justifyContent: 'center',
 },
 main:{
  marginBottom:500,
 },
});


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

export default PostScreen;



