import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import MenuSearchBar from './search';
import Back from '../assets/Back.png';
import TabUp from '../assets/FilterUp.png';
import TabDown from '../assets/FilterDown.png';

const FilterScreen = () => {
    const navigation = useNavigation();
    const [filterStates, setFilterStates] = useState({
        distance: false,
        pricing: false,
        dateTime: false,
    });
    const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedDates, setSelectedDates] = useState({});
    const [selectedTimeFrames, setSelectedTimeFrames] = useState({});
    const [addressInput, setAddressInput] = useState('');
    const [currentLocation, setCurrentLocation] = useState('913 S University Ave, Ann Arbor...');
    const [timeRange, setTimeRange] = useState('30 minutes');
    const [mileRange, setMileRange] = useState('8 miles');
    const [minPrice, setMinPrice] = useState('10');
    const [maxPrice, setMaxPrice] = useState('100');
    const [pricePer, setPricePer] = useState('Hour');

    const handleBackPress = () => {
        navigation.goBack();
    };

    const toggleFilter = (filterName) => {
        setFilterStates(prevStates => ({
            ...prevStates,
            [filterName]: !prevStates[filterName],
        }));
    };

    const handleTagSelection = (tag) => {
        setSelectedTag(tag === selectedTag ? null : tag);
    };

    const toggleTimeFrame = (timeFrame) => {
        setSelectedTimeFrames(prev => ({...prev, [timeFrame]: !prev[timeFrame]}));
    };

    const handleDateSelect = (day) => {
        const updatedSelectedDates = {...selectedDates};
        if (updatedSelectedDates[day.dateString]) {
            delete updatedSelectedDates[day.dateString];
        } else {
            updatedSelectedDates[day.dateString] = {selected: true, selectedColor: '#0653A1'};
        }
        setSelectedDates(updatedSelectedDates);
    };
    
    const resetDateTimeFilter = () => {
        setSelectedDates({});
        setSelectedTimeFrames({});
    };
    
    const timeFrames = [
        "Morning (6:00AM to 12:00PM)",
        "Afternoon (12:00PM to 6:00PM)",
        "Night (6:00PM to 12:00AM)",
        "Late night (12:00AM to 6:00AM)",
        "All-day"
    ];

    const resetAllFilters = () => {
        setFilterStates({ distance: false, pricing: false, dateTime: false });
        setSelectedDates({});
        setSelectedTimeFrames({});
        setAddressInput('');
        setTimeRange('30 minutes');
        setMileRange('8 miles');
        setMinPrice('10');
        setMaxPrice('100');
        setPricePer('Hour');
    };

    const resetDistanceFilter = () => {
        setAddressInput('');
        setTimeRange('30 minutes');
        setMileRange('8 miles');
    };

    const resetPricingFilter = () => {
        setMinPrice('10');
        setMaxPrice('100');
        setPricePer('Hour');
    };
    
    const TagsModal = ({ isVisible, onClose }) => {
        const tagOptions = [
          'Parallel parking',
          'Handicap',
          'Parking garage',
          'Shaded',
          'On street parking',
          'Driveway'
        ];
        
        return (
          isVisible && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add tags</Text>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  <TouchableOpacity 
                    style={styles.modalOption}
                    onPress={() => handleTagSelection(null)}
                  >
                    <View style={styles.radioButtonContainer}>
                      <View style={styles.radioButton}>
                        {selectedTag === null && <View style={styles.radioButtonInner} />}
                      </View>
                      <Text style={styles.modalNone}>None</Text>
                    </View>
                  </TouchableOpacity>
                  {tagOptions.map((tag, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.modalOption}
                      onPress={() => handleTagSelection(tag)}
                    >
                      <View style={styles.radioButtonContainer}>
                        <View style={styles.radioButton}>
                          {selectedTag === tag && <View style={styles.radioButtonInner} />}
                        </View>
                        <View style={styles.tagBackground}>
                          <Text style={styles.modalOptionText}>{tag}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity 
                  style={styles.modalSaveButton} 
                  onPress={() => {
                    onClose();
                    // Here you can also handle the selectedTag as needed
                  }}
                >
                  <Text style={styles.modalSaveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        );
    };

    return (
        <View style={styles.container}>
            <MenuSearchBar showSearchBar={false} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleBackPress}>
                            <Image source={Back} style={styles.Back} />
                        </TouchableOpacity>
                        <Text style={styles.filterHeading}>Filters</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>Save Changes</Text>
                            </TouchableOpacity>
                            <Text style={styles.savedText}>All Changes Saved</Text>
                        </View>
                        <TouchableOpacity style={styles.resetButton} onPress={resetAllFilters}>
                            <Text style={styles.resetText}>Reset All Filters</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.filterSection}>
                        <TouchableOpacity
                            style={styles.filterTab}
                            onPress={() => toggleFilter('distance')}
                        >
                            <View style={styles.filterTabContent}>
                                <Image source={filterStates.distance ? TabDown : TabUp} style={styles.filterIcon} />
                                <Text style={styles.filterTabText}>Distance</Text>
                            </View>
                        </TouchableOpacity>
                        {filterStates.distance && (
                            <View style={styles.filterContent}>
                                <View style={styles.resetThisFilterContainer}>
                                    <TouchableOpacity onPress={resetDistanceFilter}>
                                        <Text style={styles.resetThisFilterText}>Reset This Filter</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.filterSubheading}>Close By:</Text>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>Use input address</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="123 Address Rd"
                                        value={addressInput}
                                        onChangeText={setAddressInput}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>Use current location</Text>
                                    <View style={styles.currentLocationContainer}>
                                        
                                        <Text style={styles.currentLocationText}>{currentLocation}</Text>
                                    </View>
                                </View>
                                <Text style={styles.filterSubheading}>Range:</Text>
                                <View style={styles.rangeContainer}>
                                    <Text style={styles.rangeLabel}>Time range</Text>
                                    <View style={styles.rangeInputContainer}>
                                        <Text style={styles.rangeInputLabel}>Less than</Text>
                                        <TouchableOpacity style={styles.rangeDropdown}>
                                            <Text style={styles.rangeDropdownText}>{timeRange}</Text>
                                          
                                        </TouchableOpacity>
                                        <Text style={styles.rangeInputLabel}>away.</Text>
                                    </View>
                                </View>
                                <View style={styles.rangeContainer}>
                                    <Text style={styles.rangeLabel}>Mile range</Text>
                                    <View style={styles.rangeInputContainer}>
                                        <Text style={styles.rangeInputLabel}>Less than</Text>
                                        <TouchableOpacity style={styles.rangeDropdown}>
                                            <Text style={styles.rangeDropdownText}>{mileRange}</Text>
                                            
                                        </TouchableOpacity>
                                        <Text style={styles.rangeInputLabel}>away.</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.filterTab}
                            onPress={() => toggleFilter('pricing')}
                        >
                            <View style={styles.filterTabContent}>
                                <Image source={filterStates.pricing ? TabDown : TabUp} style={styles.filterIcon} />
                                <Text style={styles.filterTabText}>Pricing</Text>
                            </View>
                        </TouchableOpacity>
                        {filterStates.pricing && (
                            <View style={styles.filterContent}>
                                <View style={styles.resetThisFilterContainer}>
                                    <TouchableOpacity onPress={resetPricingFilter}>
                                        <Text style={styles.resetThisFilterText}>Reset This Filter</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.filterSubheading}>Price Range:</Text>
                                <View style={styles.priceRangeContainer}>
                                    <View style={styles.priceInputContainer}>
                                        <Text style={styles.priceInputLabel}>Minimum</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            value={minPrice}
                                            onChangeText={setMinPrice}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View style={styles.priceInputContainer}>
                                        <Text style={styles.priceInputLabel}>Maximum</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            value={maxPrice}
                                            onChangeText={setMaxPrice}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                                <View style={styles.pricePerContainer}>
                                    <Text style={styles.pricePerLabel}>Per</Text>
                                    <TouchableOpacity style={styles.pricePerDropdown}>
                                        <Text style={styles.pricePerDropdownText}>{pricePer}</Text>
                                        
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.filterTab}
                            onPress={() => toggleFilter('dateTime')}
                        >
                            <View style={styles.filterTabContent}>
                                <Image source={filterStates.dateTime ? TabDown : TabUp} style={styles.filterIcon} />
                                <Text style={styles.filterTabText}>Date and Time</Text>
                            </View>
                        </TouchableOpacity>
                        {filterStates.dateTime && (
                            <View style={styles.dateTimeContent}>
                                <View style={styles.resetThisFilterContainer}>
                                    <TouchableOpacity onPress={resetDateTimeFilter}>
                                        <Text style={styles.resetThisFilterText}>Reset This Filter</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.dateFrameText}>Date Frame:</Text>
                                <Calendar
                                    style={styles.calendar}
                                    theme={{
                                        backgroundColor: '#ffffff',
                                        calendarBackground: '#ffffff',
                                        textSectionTitleColor: '#b6c1cd',
                                        selectedDayBackgroundColor: '#0653A1',
                                        selectedDayTextColor: '#ffffff',
                                        todayTextColor: '#0653A1',
                                        dayTextColor: '#2d4150',
                                        textDisabledColor: '#d9e1e8',
                                        dotColor: '#0653A1',
                                        selectedDotColor: '#ffffff',
                                        arrowColor: '#0653A1',
                                        monthTextColor: '#0653A1',
                                        indicatorColor: '#0653A1',
                                        textDayFontFamily: 'NotoSansTaiTham-Regular',
                                        textMonthFontFamily: 'NotoSansTaiTham-Bold',
                                        textDayHeaderFontFamily: 'NotoSansTaiTham-Regular',
                                    }}
                                    onDayPress={handleDateSelect}
                                    markedDates={selectedDates}
                                />
                                <Text style={styles.timeFrameText}>Time Frame:</Text>
                                {timeFrames.map((timeFrame, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={styles.timeFrameOption}
                                        onPress={() => toggleTimeFrame(timeFrame)}
                                    >
                                        <View style={[
                                            styles.checkbox,
                                            selectedTimeFrames[timeFrame] && styles.checkboxSelected
                                        ]} />
                                        <Text style={styles.timeFrameOptionText}>{timeFrame}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                    <View style={styles.tagsButtonContainer}>
                        <TouchableOpacity 
                            style={styles.tagsButton}
                            onPress={() => setIsTagsModalOpen(true)}
                        >
                            <Text style={styles.tagsButtonText}>+ Tags</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <TagsModal 
                isVisible={isTagsModalOpen} 
                onClose={() => setIsTagsModalOpen(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    Back: {
        width: 45,
        height: 45,
        marginTop: 2,
        marginLeft: -2,
    },
    filterHeading: {
        marginLeft: 16,
        fontSize: 27,
        fontFamily: "NotoSansTaiTham-Bold",
        letterSpacing: -1,
        marginTop: 8.5,
    },
    buttonContainer: {
        marginVertical: 20,
        alignItems: 'center',
        width: '100%',
        marginTop: -3,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#0653A1',
        borderRadius: 999,
        width: 180,
        height: 61,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '48%',
    },
    saveButtonText: {
        color: '#ffffff',
        fontFamily: "NotoSansTaiTham-Regular",
        fontSize: 16,
    },
    savedText: {
        color: '#A8A8A8',
        fontSize: 16,
        position: 'absolute',
        right: '8%',
        fontFamily: "NotoSansTaiTham-Regular",
    },
    resetButton: {
        width: '100%',
        alignItems: 'flex-end',
        marginRight: '16.75%',
        marginTop: '1%',
    },
    resetText: {
        color: '#0653A1',
        fontSize: 16,
        textDecorationLine: 'underline',
        left: '3.5%',
    },
    filterSection: {
        alignItems: 'center',
        marginTop: '-4.25%',
    },
    filterTab: {
        backgroundColor: '#EEEBDB',
        borderRadius: 10,
        width: '92%',
        height: 44,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '2.75%',
    },
    filterTabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
    },
    filterIcon: {
        position: 'absolute',
        left: 15,
        width: 21,
        height: 21,
    },
    filterTabText: {
        fontSize: 16,
        fontFamily: "NotoSansTaiTham-Bold",
    },
    tagsButtonContainer: {
        alignItems: 'center',
    },
    tagsButton: {
        backgroundColor: '#0653A1',
        borderRadius: 10,
        width: 100,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2.2%',
    },
    tagsButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: "NotoSansTaiTham-Bold",
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(45, 45, 45, 0.21)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 17,
        width: '92%',
        height: 436,
        paddingTop: '2%',
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: "NotoSansTaiTham-Bold",
        letterSpacing: -1,
        textAlign: 'center',
        marginVertical: '3%',
    },
    modalOption: {
        marginBottom: '2.75%',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    radioButton: {
        height: 25,
        width: 25,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#A8A8A8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    radioButtonInner: {
        height: 18,
        width: 18,
        borderRadius: 10,
        backgroundColor: '#052658',
    },
    modalOptionText: {
        fontSize: 14,
    },
    modalNone: {
        fontSize: 14,
        marginLeft: '2%',
    },
    modalSaveButton: {
        backgroundColor: '#0653A1',
        borderRadius: 999,
        width: '80%',
        justifyContent: 'center',
        height: 45,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '8.25%',
    },
    modalSaveButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: "NotoSansTaiTham-Regular",
    },
    tagBackground: {
        backgroundColor: '#FED869',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        justifyContent: 'center',
    },
    dateTimeContent: {
        width: '92%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    resetThisFilterContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    resetThisFilterText: {
        color: '#0653A1',
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    dateFrameText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginBottom: 10,
    },
    calendar: {
        marginBottom: 20,
    },
    timeFrameText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginBottom: 10,
    },
    timeFrameOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#0653A1',
        borderRadius: 4,
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: '#0653A1',
    },
    timeFrameOptionText: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    filterContent: {
        width: '92%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    filterSubheading: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#b6c1cd',
        borderRadius: 5,
        padding: 10,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    currentLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0653A1',
        borderRadius: 5,
        padding: 10,
    },
    locationIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    currentLocationText: {
        fontFamily: 'NotoSansTaiTham-Regular',
        color: '#0653A1',
    },
    rangeContainer: {
        marginBottom: 15,
    },
    rangeLabel: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginBottom: 5,
    },
    rangeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rangeInputLabel: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginRight: 5,
    },
    rangeDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0653A1',
        borderRadius: 5,
        padding: 10,
    },
    rangeDropdownText: {
        color: '#ffffff',
        fontFamily: 'NotoSansTaiTham-Regular',
        marginRight: 5,
    },
    dropdownIcon: {
        width: 10,
        height: 10,
    },
    priceRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    priceInputContainer: {
        width: '48%',
    },
    priceInputLabel: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginBottom: 5,
    },
    priceInput: {
        borderWidth: 1,
        borderColor: '#b6c1cd',
        borderRadius: 5,
        padding: 10,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    pricePerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pricePerLabel: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginRight: 10,
    },
    pricePerDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0653A1',
        borderRadius: 5,
        padding: 10,
    },
    pricePerDropdownText: {
        color: '#ffffff',
        fontFamily: 'NotoSansTaiTham-Regular',
        marginRight: 5,
    },
    dateTimeContent: {
        width: '92%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    resetThisFilterContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    resetThisFilterText: {
        color: '#0653A1',
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    dateFrameText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginBottom: 10,
    },
    calendar: {
        marginBottom: 20,
    },
    timeFrameText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginBottom: 10,
    },
    timeFrameOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#0653A1',
        borderRadius: 4,
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: '#0653A1',
    },
    timeFrameOptionText: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
});

export default FilterScreen;
