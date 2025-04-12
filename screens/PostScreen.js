import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Dropdown from '../assets/Down.png';
import { createPost, collection, query, where, getDocs } from '../firebaseFunctions/firebaseFirestore';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { TagsModal, useTagsModal } from './FilterScreen';
import { database } from '../services/configFirestore'; 
const { width } = Dimensions.get('window');
const API_KEY = 'AIzaSyC5Fz0BOBAJfvvMwmGB27hJYRhFNq7ll5w';

function PostScreen({ navigation, route }) {
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState({ hours: '', minutes: '' });
  const [endTime, setEndTime] = useState({ hours: '', minutes: '' });
  const [startPeriod, setStartPeriod] = useState('AM');
  const [endPeriod, setEndPeriod] = useState('AM');
  const [price, setPrice] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState('hour');
  const [isNegotiable, setIsNegotiable] = useState(null);
  const [sizeOfCar, setSize] = useState('sedan');
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState('');
  const [selectedDates, setSelectedDates] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const { isTagsModalOpen, setIsTagsModalOpen, selectedTags, handleTagSelection, updateSelectedTags, tagOptions, numTags } = useTagsModal();

  const fetchAddressSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      setIsAddressSelected(false);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${API_KEY}&types=geocode&components=country:us`
      );
      const json = await response.json();
      console.log("API Response:", json);

      if (json.predictions) {
        setSuggestions(json.predictions);
        setIsAddressSelected(false);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  const handleSelectAddress = (address) => {
    setLocation(address);
    setIsAddressSelected(true);
    setSuggestions([]); // Hide suggestions after selection
  };
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

  useEffect(() => {
    handleTags(selectedTags)
  }, [selectedTags]);

  const handleTags = (selectedTags) => {
    setTags([...selectedTags]);
  };

  // const handleRemoveTag = (index) => {
  //   const newTags = [...tags];
  //   newTags.splice(index, 1);
  //   setTags(newTags);
  // };

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
    return unsubscribe;
  }, [navigation]);

  const onPostPress = async () => {
    const userId = route.params.userId;
    const firstDate = Object.keys(selectedDates)[0];
    const lastDate = Object.keys(selectedDates)[Object.keys(selectedDates).length - 1];

    if (!location.trim() || !isAddressSelected) {
      alert("Please select an address from the suggestions.");
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

    const isStartTimePartial = startTime.hours || startTime.minutes;
    const isEndTimePartial = endTime.hours || endTime.minutes;

    const isStartTimeComplete = startTime.hours && startTime.minutes;
    const isEndTimeComplete = endTime.hours && endTime.minutes;

    if ((isStartTimePartial || isEndTimePartial) && (!isStartTimeComplete || !isEndTimeComplete)) {
      alert("If you include a time, both start and end time must be fully entered.");
      return;
    }

    const isValidHour = (val) => /^\d{1,2}$/.test(val) && parseInt(val) >= 1 && parseInt(val) <= 12;
    const isValidMinute = (val) => /^\d{2}$/.test(val) && parseInt(val) >= 0 && parseInt(val) <= 59;

    if (isStartTimeComplete || isEndTimeComplete) {
      if (!isValidHour(startTime.hours) || !isValidMinute(startTime.minutes)) {
        alert("Please enter a valid start time using standard 12-hour clock format.");
        return;
      }

      if (!isValidHour(endTime.hours) || !isValidMinute(endTime.minutes)) {
        alert("Please enter a valid end time using standard 12-hour clock format.");
        return;
      }
    }
    
    try {
        // Step 1: Convert address to latitude & longitude using Google Geocoding API
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${API_KEY}&types=geocode&components=country:us`
        );
        const data = await response.json();

        if (data.status !== "OK" || !data.results.length) {
            alert("Unable to find location. Please enter a valid address.");
            return;
        }

        const addressComponents = data.results[0].address_components;

        // Define required types
        const requiredTypes = ['street_number', 'route', 'locality', 'administrative_area_level_1', 'postal_code'];

        // Check if all required types are present
        const hasAllParts = requiredTypes.every(type =>
          addressComponents.some(component => component.types.includes(type))
        );

        if (!hasAllParts) {
          alert("Please enter a complete address including house number, street, city, state, and ZIP code.");
          return;
        }

        const { lat, lng } = data.results[0].geometry.location;
        const postQuery = query(
          collection(database, 'posts'),
          where('userID', '==', userId),
          where('location', '==', location.trim())
        );

        const existingPostsSnapshot = await getDocs(postQuery);

        if (!existingPostsSnapshot.empty) {
          alert('This address is already listed.');
          return;
        }

        // Step 2: Create post and store coordinates
        const postId = await createPost(userId, location, rentalPeriod, price, isNegotiable, firstDate, lastDate, 
          { hours: startTime.hours, minutes: startTime.minutes, period: startPeriod },
          { hours: endTime.hours, minutes: endTime.minutes, period: endPeriod },
          sizeOfCar,
          lat,  // Store latitude
          lng,   // Store longitude
          selectedTags
        );

        // Step 3: Navigate to confirmation screen (not MapScreen)
        navigation.navigate('PostConfirmationScreen', { postId });

    } catch (error) {
        console.error('Error creating post:', error);
        alert('Error creating post. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar}></View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>List Your Space</Text>
        <Text style={styles.subHeading}>Location</Text>
        <View>
            <Searchbar
              placeholder="Search Address"
              onChangeText={(query) => {
                setLocation(query);
                fetchAddressSuggestions(query);
              }}
              value={location}
              style={styles.searchInput}
              inputStyle={styles.searchText}
              placeholderTextColor="#A8A8A8"
            />
            {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((item, index) => (
                <TouchableOpacity key={item.place_id} onPress={() => handleSelectAddress(item.description)}>
                  <Text style={[
                    styles.suggestionItem,
                    index === suggestions.length - 1 && { borderBottomWidth: 0 }
                  ]}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
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
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 17,
                    backgroundColor: '#E9E9E9',
                    height: 40,
                    width: 110,
                    paddingLeft: '3.5%',
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
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 17,
                backgroundColor: '#E9E9E9',
                height: 40,
                width: 100,
                paddingLeft: '3.5%',
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
          <TouchableOpacity style={styles.addTagButton} onPress={() => setIsTagsModalOpen(true)}>
            <Text style={styles.addTagButtonText}>+ Add</Text>
          </TouchableOpacity>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
              {/* <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                <Text style={styles.removeTagText}>×</Text>
              </TouchableOpacity> */}
            </View>
          ))}
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
      <TagsModal 
          isVisible={isTagsModalOpen} 
          onClose={() => {updateSelectedTags(selectedTags); setIsTagsModalOpen(false);}}
          handleTagSelection={handleTagSelection}
          tagOptions={tagOptions}
          numTags={numTags}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bar: {
    backgroundColor: '#052658',
    height: 110,
    width: '100%',
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
  searchInput: {
      backgroundColor: '#E9E9E9',
      alignSelf: 'center',
      height: 40,
      width: width * 0.925,
  },
  searchText: {
      fontSize: 16,
      marginVertical: -10,
      color: "#000"
  },
  suggestionsContainer: {
      position: 'absolute',
      top: 45,
      width: width * 0.925,
      alignSelf: 'center', 
      backgroundColor: '#E9E9E9',
      borderRadius: 15,
      overflow: 'hidden',
      zIndex: 2,
  },
  suggestionItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      fontSize: 16,
  },
});

export default PostScreen;