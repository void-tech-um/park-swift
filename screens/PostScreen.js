import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MenuSearchBar from '../components/MenuSearchBar';
import Dropdown from '../assets/Down.png';
import { createPost } from '../firebaseFunctions/firebaseFirestore';
import RNPickerSelect from 'react-native-picker-select';
import { useIsFocused } from '@react-navigation/native';

function PostScreen({ navigation, route }) {
  const [location, setLocation] = React.useState('');
  const [startTime, setStartTime] = React.useState({ hours: '', minutes: '' });
  const [endTime, setEndTime] = React.useState({ hours: '', minutes: '' });
  const [startPeriod, setStartPeriod] = React.useState('AM');
  const [endPeriod, setEndPeriod] = React.useState('AM');
  const [price, setPrice] = React.useState('');
  const [rentalPeriod, setRentalPeriod] = React.useState('hour');
  const [isNegotiable, setIsNegotiable] = React.useState(null);
  const [sizeOfCar, setSize] = React.useState('sedan');
  const [tags, setTags] = React.useState([]);
  const [notes, setNotes] = React.useState('');
  const [selectedDates, setSelectedDates] = React.useState({});
  
  const handleDateSelect = (date) => {
    const dateString = date.dateString;
    let updatedSelectedDates = { ...selectedDates };

    if (Object.keys(updatedSelectedDates).length === 0) {
        updatedSelectedDates[dateString] = {
            selected: true,
            startingDay: true,
            endingDay: true,
            color: 'rgba(6, 83, 161, 1)',
            textColor: '#FFFFFF',
            customStyles: {
                container: {
                    backgroundColor: 'rgba(6, 83, 161, 1)',
                },
                text: {
                    color: '#FFFFFF',
                },
            },
        };
    } else if (Object.keys(updatedSelectedDates).length === 1) {
        const firstDate = Object.keys(updatedSelectedDates)[0];
        if (firstDate === dateString) {
            updatedSelectedDates = {};
        } else {
            const [startDate, endDate] = [firstDate, dateString].sort();
            updatedSelectedDates = {
                [startDate]: {
                    startingDay: true,
                    color: 'rgba(6, 83, 161, 1)',
                    textColor: '#FFFFFF',
                    customStyles: {
                        container: {
                            backgroundColor: 'rgba(6, 83, 161, 1)',
                        },
                        text: {
                            color: '#FFFFFF',
                        },
                    },
                },
                [endDate]: {
                    endingDay: true,
                    color: 'rgba(6, 83, 161, 1)',
                    textColor: '#FFFFFF',
                    customStyles: {
                        container: {
                            backgroundColor: 'rgba(6, 83, 161, 1)',
                        },
                        text: {
                            color: '#FFFFFF',
                        },
                    },
                },
            };
            let currentDate = new Date(startDate);
            const lastDate = new Date(endDate);
            currentDate.setDate(currentDate.getDate() + 1);
            while (currentDate < lastDate) {
                const dateStr = currentDate.toISOString().split('T')[0];
                updatedSelectedDates[dateStr] = {
                    color: 'rgba(6, 83, 161, 0.2)',
                    customStyles: {
                        container: {
                            backgroundColor: 'rgba(6, 83, 161, 0.2)',
                        },
                        text: {
                            color: '#FFFFFF',
                        },
                    },
                };
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    } else {
        updatedSelectedDates = {
            [dateString]: {
                selected: true,
                startingDay: true,
                endingDay: true,
                color: 'rgba(6, 83, 161, 1)',
                textColor: '#FFFFFF',
                customStyles: {
                    container: {
                        backgroundColor: 'rgba(6, 83, 161, 1)',
                    },
                    text: {
                        color: '#FFFFFF',
                    },
                },
            },
        };
    }
    setSelectedDates(updatedSelectedDates);
};

  const handleAddTag = () => {
    setTags([...tags, 'New Tag']);
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const isFocused = useIsFocused();

  const resetForm = () => {
    setLocation('');
    setStartTime({ hours: '', minutes: '' });
    setEndTime({ hours: '', minutes: '' });
    setStartPeriod('AM');
    setEndPeriod('AM');
    setPrice('');
    setRentalPeriod('hour');
    setIsNegotiable(null);
    setSize('sedan');
    setTags([]);
    setNotes('');
    setSelectedDates({});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetForm();
    });

    return unsubscribe; // Cleanup listener on unmount
  }, [navigation]);

  const onPostPress = () => {
    const userId = route.params.userId;
    const firstDate = Object.keys(selectedDates)[0];
    const lastDate = Object.keys(selectedDates)[Object.keys(selectedDates).length - 1];

    if (!location.trim()) {
        alert("Please enter a location.");
        return;
    }
    if (!firstDate || !lastDate) {
      alert("Please select valid calendar dates.");
      return;
    }
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) < 0 || parseFloat(price) > 999999.99) {
      alert("Please enter a valid price.");
      return;
    }

    createPost(userId, location, rentalPeriod, price, isNegotiable, firstDate, lastDate, 
      { hours: startTime.hours, minutes: startTime.minutes, period: startPeriod },
      { hours: endTime.hours, minutes: endTime.minutes, period: endPeriod },
      sizeOfCar
    )  
    .then((docRef) => {
        navigation.navigate('PostConfirmationScreen', { postId: docRef.id });
    })
    .catch((error) => {
        console.error('Error creating post:', error);
        alert('Error creating post. Please try again.');
    });
  };

  return (
    <View style={styles.container}>
        <MenuSearchBar showSearchBar={false} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>List Your Space</Text>
        <Text style={styles.subHeading}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#A8A8A8"
          value={location}
          onChangeText={setLocation}
        />
        <Text style={styles.subHeading}>Start Time</Text>
        <View style={styles.timeContainer}>
          <TextInput
            style={styles.timeInput}
            placeholder="12"
            placeholderTextColor="#A8A8A8"
            keyboardType="numeric"
            value={startTime.hours}
            onChangeText={(text) => setStartTime({ ...startTime, hours: text })}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.timeInput}
            placeholder="00"
            placeholderTextColor="#A8A8A8"
            keyboardType="numeric"
            value={startTime.minutes}
            onChangeText={(text) => setStartTime({ ...startTime, minutes: text })}
          />
          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              onValueChange={(value) => setStartPeriod(value)}
              items={[
                { label: 'AM', value: 'AM', color: 'black' },
                { label: 'PM', value: 'PM', color: 'black' },
              ]}
              value={startPeriod}
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: 'black',
                  height: 40,
                  width: 75,
                  backgroundColor: '#E9E9E9',
                  borderRadius: 17,
                  paddingLeft: 15,
                  paddingRight: 35, 
                  textAlign: 'left', 
                },
                inputAndroid: {
                  fontSize: 16,
                  color: 'black',
                  height: 40,
                  backgroundColor: '#E9E9E9',
                  borderRadius: 17,
                  paddingLeft: 15, 
                  paddingRight: 35, 
                  textAlign: 'left', 
                },
                iconContainer: {
                  position: 'absolute',
                  right: 13, 
                  top: '50%', 
                  transform: [{ translateY: '-50%' }], 
                },
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              Icon={() => (
                <Image source={Dropdown} style={styles.dropdownImage} />
              )}
            />
          </View>
        </View>

        <Text style={styles.subHeading}>End Time</Text>
        <View style={styles.timeContainer}>
          <TextInput
            style={styles.timeInput}
            placeholder="12"
            placeholderTextColor="#A8A8A8"
            keyboardType="numeric"
            value={endTime.hours}
            onChangeText={(text) => setEndTime({ ...endTime, hours: text })}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.timeInput}
            placeholder="00"
            placeholderTextColor="#A8A8A8"
            keyboardType="numeric"
            value={endTime.minutes}
            onChangeText={(text) => setEndTime({ ...endTime, minutes: text })}
          />
          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              onValueChange={(value) => setEndPeriod(value)}
              items={[
                { label: 'AM', value: 'AM', color: 'black' },
                { label: 'PM', value: 'PM', color: 'black' },
              ]}
              value={endPeriod}
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: 'black',
                  height: 40,
                  width: 75,
                  backgroundColor: '#E9E9E9',
                  borderRadius: 17,
                  paddingLeft: 15,
                  paddingRight: 35, 
                  textAlign: 'left', 
                },
                inputAndroid: {
                  fontSize: 16,
                  color: 'black',
                  height: 40,
                  backgroundColor: '#E9E9E9',
                  borderRadius: 17,
                  paddingLeft: 15, 
                  paddingRight: 35, 
                  textAlign: 'left', 
                },
                iconContainer: {
                  position: 'absolute',
                  right: 13, 
                  top: '50%', 
                  transform: [{ translateY: '-50%' }], 
                },
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              Icon={() => (
                <Image source={Dropdown} style={styles.dropdownImage} />
              )}
            />
          </View>
        </View>

        <Text style={styles.subHeading}>Available dates</Text>
        <View style={styles.calendarContainer}>
          <Calendar
              style={styles.calendar}
              onDayPress={handleDateSelect}
              markedDates={selectedDates}
              markingType={'period'}
              theme={{
                  textDayFontSize: 13,
                  textMonthFontSize: 13,
                  textDayHeaderFontSize: 13,
                  textDayFontFamily: 'NotoSansTaiTham-Regular',
                  textMonthFontFamily: 'NotoSansTaiTham-Bold',
                  textDayHeaderFontFamily: 'NotoSansTaiTham-Regular',
                  calendarBackground: 'white',
                  textSectionTitleColor: 'black',
                  dayTextColor: 'black',
                  monthTextColor: 'black',
                  todayTextColor: 'black',
                  arrowColor: 'rgba(6, 83, 161, 1)',
                  selectedDayTextColor: 'black',
                }}
            />
        </View>
        <View style={styles.priceAndNegotiableContainer}>
          <View style={styles.priceSection}>
            <Text style={styles.subHeading}>Price</Text>
            <View style={[styles.priceInputs, { marginTop: '-2.5%' }]}>
            <View style={styles.priceContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.inputPrice}
                keyboardType="numeric"
                placeholder="0.00"
                value={price}
                onChangeText={(text) => {
                  // Allow only numbers and one decimal point
                  let sanitizedText = text.replace(/[^0-9.]/g, '');
                  // Ensure only one decimal point
                  if ((sanitizedText.match(/\./g) || []).length > 1) {
                    sanitizedText = sanitizedText.slice(0, -1);
                  }
                  // Limit to two digits after the decimal
                  if (sanitizedText.includes('.')) {
                    const parts = sanitizedText.split('.');
                    if (parts[1]?.length > 2) {
                      sanitizedText = `${parts[0]}.${parts[1].slice(0, 2)}`;
                    }
                  }
                  // Convert to a number and enforce range limits
                  const numericValue = parseFloat(sanitizedText);
                  if (numericValue > 999999.99) {
                    sanitizedText = '999999.99';
                  } else if (numericValue < 0) {
                    sanitizedText = '0.00';
                  }
                  setPrice(sanitizedText);
                }}
              />
            </View>
              <Text style={styles.slash}>/</Text>
              <RNPickerSelect
                onValueChange={(value) => setRentalPeriod(value)}
                items={[
                  { label: 'Hour', value: 'hour', color: 'black'},
                  { label: 'Day', value: 'day', color: 'black' },
                  { label: 'Week', value: 'week', color: 'black' },
                  { label: 'Month', value: 'month', color: 'black' },
                  { label: 'Semstr', value: 'semester', color: 'black' },
                ]}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 17,
                    backgroundColor: '#E9E9E9',
                    height: 40,
                    width: 110,
                    paddingLeft: '3.5%',
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderRadius: 17,
                    backgroundColor: '#E9E9E9',
                    height: 40,
                    width: 110,
                  },
                  iconContainer: {
                    top: '40%',
                    right: '14%',
                  },
                }}
                value={rentalPeriod}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                Icon={() => (
                  <Image source={Dropdown} style={styles.dropdownImage} />
                )}
              />
            </View>
          </View>

          <View style={styles.negotiableSection}>
            <Text style={[styles.subHeading, {marginLeft: '1%'}]}>Negotiable</Text>
            <View style={styles.negotiableOptions}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setIsNegotiable((prev) => (prev === true ? null : true))}
            >
              <View style={styles.unselectedCircle}>
                {isNegotiable === true && <View style={styles.selectedCircle} />}
              </View>
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setIsNegotiable((prev) => (prev === false ? null : false))}
            >
              <View style={styles.unselectedCircle}>
                {isNegotiable === false && <View style={styles.selectedCircle} />}
              </View>
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.subHeading}>Size</Text>
        <View style={styles.sizeInput}>
          <RNPickerSelect
            onValueChange={(value) => setSize(value)}
            items={[
              { label: 'Sedan', value: 'sedan', color: 'black' },
              { label: 'SUV', value: 'suv', color: 'black' },
              { label: 'Minivan', value: 'minivan', color: 'black' },
              { label: 'Full-bed Truck', value: 'fullbedtruck', color: 'black' },
              { label: 'Half-bed Truck', value: 'halfbedtruck', color: 'black' },
              { label: 'RV', value: 'rv', color: 'black' },
              { label: 'Camper Van', value: 'campervan', color: 'black' },
            ]}
            value={sizeOfCar}
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 17,
                backgroundColor: '#E9E9E9',
                height: 40,
                width: 100,
                paddingLeft: '3.5%',
              },
              inputAndroid: {
                fontSize: 16,
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 17,
                backgroundColor: '#E9E9E9',
                height: 40,
                width: 110,
              },
              iconContainer: {
                top: '40%',
                right: '14%',
              },
            }}
            useNativeAndroidPickerStyle={false}
            placeholder={{}}
            Icon={() => (
              <Image source={Dropdown} style={styles.dropdownImage} />
            )}
          />
        </View>

        <Text style={styles.subHeading}>Tags</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                <Text style={styles.removeTagText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addTagButton} onPress={handleAddTag}>
            <Text style={styles.addTagButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeading}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Please remove your car on time."
          placeholderTextColor="#A8A8A8"
          multiline
          value={notes}
          onChangeText={setNotes}
        />
        <TouchableOpacity style={styles.listButton} onPress={onPostPress}>
          <Text style={styles.listButtonText}>List</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewContent: {
    paddingBottom: '8%', 
  },
  title: {
    fontFamily: "NotoSansTaiTham-Bold",
    fontSize: 29,
    letterSpacing: -1,
    marginTop: '6.3%',
    marginLeft: '3.5%',
  },
  subHeading: {
    fontSize: 16,
    marginLeft: '3.7%',
    fontFamily: "NotoSansTaiTham-Regular",
    marginTop: '2%',
    marginBottom: '1%',
  },
  input: {
    height: 40,
    borderRadius: 17,
    fontSize: 16,
    color: '#000000',
    fontFamily: "NotoSansTaiTham-Regular",
    backgroundColor: '#E9E9E9',
    paddingHorizontal: 14,
    marginLeft: '3.5%',
    marginRight: '3.5%',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3.5%',
    marginRight: '3.5%',
  },
  timeInput: {
    height: 40,
    borderRadius: 17,
    fontSize: 16,
    color: '#000000',
    fontFamily: "NotoSansTaiTham-Regular",
    backgroundColor: '#E9E9E9',
    textAlign: 'center',
    width: 52,
    marginRight: '0.5%',
  },
  colon: {
    fontSize: 34,
    color: '#000000',
    fontFamily: "NotoSansTaiTham-Regular",
    marginHorizontal: 5,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 17,
    justifyContent: 'center',
    marginLeft: '1.25%',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
  },
  dropdownImage: {
    width: 15,
    height: 9,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalOption: {
    backgroundColor: '#ffffff',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#000000',
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 6,
    overflow: 'hidden',
    width: '77%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  calendar: {   
      marginBottom:-8,
      paddingLeft: 0,
      paddingRight: 0,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '3.5%',
    marginRight: '3.5%',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 17,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 16,
    marginRight: 5,
  },
  removeTagText: {
    fontSize: 18,
    color: '#888',
  },
  addTagButton: {
    backgroundColor: '#0653A1',
    height: 40,
    width: 86,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addTagButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  notesInput: {
    height: 140,
    width: "92%",
    textAlignVertical: 'top',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  listButton: {
    backgroundColor: '#0653A1',
    borderRadius: 999,
    width: 191,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  listButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceAndNegotiableContainer: {
    flexDirection: 'row',
  },
  priceSection: {
    marginLeft: '1.5%',
  },
  sizeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3.75%',
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 17,
    marginLeft: '3%',
    paddingHorizontal: 12,
    height: 40,
    width: 100, 
  },
  dollarSign: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 7, 
    fontFamily: "NotoSansTaiTham-Regular",
  },
  inputPrice: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily: "NotoSansTaiTham-Regular",
    marginTop: '2',
  },
  slash: {
    marginTop: '-4%',
    fontSize: 30,
    color: 'black',
    marginHorizontal: 5,
  },
  negotiableSection: {
    marginLeft: '5%',
  },
  negotiableOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  unselectedCircle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  selectedCircle: {
    backgroundColor: '#052658',
    borderColor: '#052658',
    width: 17,
    height: 17,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
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
    width: 100,
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