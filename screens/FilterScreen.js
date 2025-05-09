import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import MenuSearchBar from '../components/MenuSearchBar';
import Back from '../assets/Back.png';
import TabUp from '../assets/FilterUp.png';
import TabDown from '../assets/FilterDown.png';
import WhiteDropdown from '../assets/whitedropdown.png';
import Location from '../assets/location.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TagsModal = ({ isVisible, onClose, handleTagSelection, tagOptions, numTags }) => {
    if (!(tagOptions instanceof Map)) {
        return null;
    }
    
    return (
      isVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add tags</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <TouchableOpacity 
                style={styles.modalOption}>
                <View style={styles.radioButtonContainer}>
                  <View style={styles.radioButton}>
                    {numTags == 0 && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.modalNone}>None</Text>
                </View>
              </TouchableOpacity>
              {[...tagOptions.keys()].map((tag, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.modalOption}
                  onPress={() => handleTagSelection(tag)}
                >
                  <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                      {tagOptions.get(tag) && <View style={styles.radioButtonInner} />}
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
              onPress={() => {{
                onClose();
                }
              }}>
              <Text style={styles.modalSaveButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    );
};

export const useTagsModal = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

    const [tagOptions, setTagOptions] = useState(new Map([
        ['Fits all models', false],
        ['Paved entrance', false],
        ['Weather protected', false],
        ['Private Property', false],
        ['Handicap', false],
        ['Parking garage', false],
        ['Shaded', false],
        ['On-street parking', false],
        ['Driveway', false],
        ['Parallel parking', false],
    ]));

    const numTags = Array.from(tagOptions.values()).filter(value => value).length;

    const handleTagSelection = (tag) => {
        setTagOptions((prevOptions) => {
            const newOptions = new Map(prevOptions);
            const pressed = newOptions.get(tag);
            newOptions.set(tag, !pressed);

            return newOptions;
        });

    };

    const updateSelectedTags = () => {
        const newTag = [];
        for (const key of tagOptions.keys()) {
            if (tagOptions.get(key)) {
                newTag.push(key);
            }
        }
        setSelectedTags(newTag);
    }

    const resetSelectedTags = () => {
        setTagOptions(new Map([
            ['Fits all models', false],
            ['Paved entrance', false],
            ['Weather protected', false],
            ['Private Property', false],
            ['Handicap', false],
            ['Parking garage', false],
            ['Shaded', false],
            ['On-street parking', false],
            ['Driveway', false],
            ['Parallel parking', false],
        ]));
        setSelectedTags([]);
    }

    return { isTagsModalOpen, setIsTagsModalOpen, selectedTags, setSelectedTags, handleTagSelection,
    updateSelectedTags, tagOptions, setTagOptions, resetSelectedTags, numTags };
}

const FilterScreen = () => {
    const navigation = useNavigation();
    const [filterStates, setFilterStates] = useState({
        distance: false,
        pricing: false,
        dateTime: false,
    });
    

    const { isTagsModalOpen, setIsTagsModalOpen, selectedTags, setSelectedTags, handleTagSelection,
    updateSelectedTags, tagOptions, setTagOptions, resetSelectedTags, numTags } = useTagsModal();
    
    const [selectedDates, setSelectedDates] = useState({});
    const [selectedTimeFrames, setSelectedTimeFrames] = useState({});
    const [addressInput, setAddressInput] = useState('');
    const [currentLocation, setCurrentLocation] = useState('913 S University Ave, Ann Arbor...');
    const [timeRange, setTimeRange] = useState('30 minutes');
    const [mileRange, setMileRange] = useState('8 miles');
    const [minPrice, setMinPrice] = useState('10');
    const [maxPrice, setMaxPrice] = useState('100');
    const [pricePer, setPricePer] = useState('Hour');
    const [category, setCategory] = useState('Hour');
    const categoryOptions = ['Hour', 'Week', 'Semester', 'Month'];
    const [useAddressChecked, setUseAddressChecked] = useState(false);
    const [useCurrentLocationChecked, setUseCurrentLocationChecked] = useState(false);
    const [timeRangeChecked, setTimeRangeChecked] = useState(false);
    const [mileRangeChecked, setMileRangeChecked] = useState(false);
    const [priceChecked, setPriceChecked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const loadSavedStates = async () => {
            try {
                const savedUseAddressChecked = await AsyncStorage.getItem('useAddressChecked');
                const savedInputAddress = await AsyncStorage.getItem('inputAddress');
                const savedUseCurrentLocationChecked = await AsyncStorage.getItem('useCurrentLocationChecked');
                const savedTimeRangeChecked = await AsyncStorage.getItem('timeRangeChecked');
                const savedMileRangeChecked = await AsyncStorage.getItem('mileRangeChecked');
                const savedPriceChecked = await AsyncStorage.getItem('priceChecked');
                const saveMaxPrice = await AsyncStorage.getItem('maxPrice');
                const savedSelectedDates = await AsyncStorage.getItem('selectedDates');
                const savedSelectedTimeFrames = await AsyncStorage.getItem('selectedTimeFrames');
                const savedSelectedTags = await AsyncStorage.getItem('selectedTags');
                const savedTagOptions = await AsyncStorage.getItem('tagOptions');

                if (savedUseAddressChecked !== null) setUseAddressChecked(JSON.parse(savedUseAddressChecked));
                if (savedInputAddress !== null) setAddressInput(savedInputAddress);
                if (savedUseCurrentLocationChecked !== null) setUseCurrentLocationChecked(JSON.parse(savedUseCurrentLocationChecked));
                if (savedTimeRangeChecked !== null) setTimeRangeChecked(JSON.parse(savedTimeRangeChecked));
                if (savedMileRangeChecked !== null) setMileRangeChecked(JSON.parse(savedMileRangeChecked));
                if (savedPriceChecked !== null) setPriceChecked(JSON.parse(savedPriceChecked));
                if (saveMaxPrice !== null) setMaxPrice(saveMaxPrice);
                if (savedSelectedDates !== null) setSelectedDates(JSON.parse(savedSelectedDates));
                if (savedSelectedTimeFrames !== null) setSelectedTimeFrames(JSON.parse(savedSelectedTimeFrames));
                if (savedSelectedTags !== null) setSelectedTags(JSON.parse(savedSelectedTags));
                if (savedTagOptions !== null) {
                    const tagOptionsPairs = JSON.parse(savedTagOptions);
                    setTagOptions(new Map(Object.entries(tagOptionsPairs)));
                }
            } catch (error) {
                console.error('Failed to load saved states:', error);
            }
        };

        loadSavedStates();
    }, []);

    const handleSavePress = async () => {
        try {
            await AsyncStorage.setItem('useAddressChecked', JSON.stringify(useAddressChecked));
            await AsyncStorage.setItem('inputAddress', addressInput);
            await AsyncStorage.setItem('useCurrentLocationChecked', JSON.stringify(useCurrentLocationChecked));
            await AsyncStorage.setItem('timeRangeChecked', JSON.stringify(timeRangeChecked));
            await AsyncStorage.setItem('mileRangeChecked', JSON.stringify(mileRangeChecked));
            await AsyncStorage.setItem('priceChecked', JSON.stringify(priceChecked));
            await AsyncStorage.setItem('maxPrice', maxPrice);
            await AsyncStorage.setItem('selectedDates', JSON.stringify(selectedDates));
            await AsyncStorage.setItem('selectedTimeFrames', JSON.stringify(selectedTimeFrames));
            await AsyncStorage.setItem('selectedTags', JSON.stringify(selectedTags));

            const tagOptionsPairs = Object.fromEntries(tagOptions);
            await AsyncStorage.setItem('tagOptions', JSON.stringify(tagOptionsPairs));

            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (error) {
            console.error('Failed to save states:', error);
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
    };
    
    const handleCategoryPress = () => {
        setCategory((prevCategory) => {
            const currentIndex = categoryOptions.indexOf(prevCategory);
            const nextIndex = (currentIndex + 1) % categoryOptions.length;
            return categoryOptions[nextIndex];
        });
    };

    const toggleFilter = (filterName) => {
        setFilterStates(prevStates => ({
            ...prevStates,
            [filterName]: !prevStates[filterName],
        }));
    };

    
    


    const toggleTimeFrame = (timeFrame) => {
        setSelectedTimeFrames(prev => ({ ...prev, [timeFrame]: !prev[timeFrame] }));
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
      
    const handleAddressCheck = () => {
        setUseAddressChecked(!useAddressChecked);
        if (!useAddressChecked) {
            setUseCurrentLocationChecked(false); // Uncheck "Use current location"
        }
    };

    const handleCurrentLocationCheck = () => {
        setUseCurrentLocationChecked(!useCurrentLocationChecked);
        if (!useCurrentLocationChecked) {
            setUseAddressChecked(false); // Uncheck "Use input address"
        }
    };

    const handleTimeRangeCheck = () => {
        setTimeRangeChecked(!timeRangeChecked);
        if (!timeRangeChecked) {
            setMileRangeChecked(false); // Uncheck "Mile range"
        }
    };

    const handleMileRangeCheck = () => {
        setMileRangeChecked(!mileRangeChecked);
        if (!mileRangeChecked) {
            setTimeRangeChecked(false); // Uncheck "Time range"
        }
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
        resetDateTimeFilter();
        resetDistanceFilter();
        resetPricingFilter();
        resetSelectedTags();
    };

    const resetDistanceFilter = () => {
        setUseAddressChecked(false);
        setUseCurrentLocationChecked(false);
        setTimeRangeChecked(false);
        setMileRangeChecked(false);
        setAddressInput('');
        setTimeRange('30 minutes');
        setMileRange('8 miles');
    };

    const resetPricingFilter = () => {
        setPriceChecked(false);
        setMinPrice('10');
        setMaxPrice('100');
        setPricePer('Hour');
    };
    
    

    return (
        <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? 'padding' : 'height'}
                    style={{flex: 1}}>
            <View style={styles.container}>
                <MenuSearchBar showSearchBar={false} />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={handleBackPress}>
                                <Image source={Back} style={styles.Back} />
                            </TouchableOpacity>
                            <Text style={styles.filterHeading}>Filters</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                                    <Text style={styles.saveButtonText}>Save Changes</Text>
                                </TouchableOpacity>
                                {isSaved && <Text style={styles.savedText}>All Changes Saved</Text>}
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
                                        <Text style={styles.checkboxLabel}>Use input address</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={handleAddressCheck}>
                                                <View style={[styles.checkbox, useAddressChecked && styles.checkboxSelected]} />
                                            </TouchableOpacity>
                                            <TextInput
                                                style={[styles.textInput, { flex: 1, marginLeft: 10 }]}
                                                placeholder="123 Address Rd"
                                                value={addressInput}
                                                onChangeText={setAddressInput}
                                                editable={useAddressChecked}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputLabel}>Use current location</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={handleCurrentLocationCheck}>
                                            <View style={[styles.checkbox, useCurrentLocationChecked && styles.checkboxSelected]} />
                                        </TouchableOpacity>
                                        <View style={[styles.currentLocationContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                                            <Image source={Location} style={styles.locationIcon} />
                                            <Text style={styles.currentLocationText}>{currentLocation}</Text>
                                        </View>
                                    </View>
                                    </View>
                                    <Text style={styles.filterSubheading}>Range:</Text>
                                    <View style={styles.rangeContainer}>
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.rangeLabel}>

                                                Time range
                                            </Text>
                                        </View>
                                        <View style={styles.rangeInputContainer}>
                                            <TouchableOpacity onPress={handleTimeRangeCheck}>
                                                <View style={[styles.checkbox, timeRangeChecked && styles.checkboxSelected]} />
                                            </TouchableOpacity>
                                            <Text style={styles.rangeInputLabel}>Less than</Text>
                                            <TouchableOpacity style={styles.rangeDropdown}>
                                                <Text style={styles.rangeDropdownText}>{timeRange}</Text>
                                                <Image source={WhiteDropdown} style={styles.dropdownIcon} />
                                            </TouchableOpacity>
                                            <Text style={styles.rangeInputLabel}> away.</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rangeContainer}>
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.rangeLabel}>

                                                Mile range
                                            </Text>
                                        </View>
                                        <View style={styles.rangeInputContainer}>
                                            <TouchableOpacity onPress={handleMileRangeCheck}>
                                                <View style={[styles.checkbox, mileRangeChecked && styles.checkboxSelected]} />
                                            </TouchableOpacity>
                                            <Text style={styles.rangeInputLabel}>Less than</Text>
                                            <TouchableOpacity style={styles.rangeDropdown}>
                                                <Text style={styles.rangeDropdownText}>{mileRange}</Text>
                                                <Image source={WhiteDropdown} style={styles.dropdownIcon} />
                                            </TouchableOpacity>
                                            <Text style={styles.rangeInputLabel}> away.</Text>
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
                                    <Text style={styles.filterSubheading}>Maximum Price:</Text>
                                    <View style={styles.priceRangeContainer}>
                                    <TouchableOpacity onPress={() => setPriceChecked(!priceChecked)}>
                                    <View style={[styles.checkbox, priceChecked && styles.checkboxSelected]} />
                                    </TouchableOpacity>
                                        <View style={styles.priceInputContainer}>
                                        
                                        <Text style={styles.dollarSign}>$</Text>
                                            <TextInput
                                                style={styles.priceInput}
                                                placeholder={maxPrice}
                                                onChangeText={setMaxPrice}
                                                keyboardType="numeric"
                                            />
                                            
                                            <Text style={styles.pricePerLabel}>  Per</Text>
                                            <TouchableOpacity style={styles.pricePerDropdown} onPress={handleCategoryPress}>
                                                <Text style={styles.pricePerDropdownText}>{category}</Text>
                                            </TouchableOpacity>
                                            
                                            {/* old dropdown
                                            <TouchableOpacity style={styles.pricePerDropdown}>
                                                <Image source={WhiteDropdown} style={styles.dropdownIcon} />
                                                <Text style={styles.pricePerDropdownText}>{pricePer}</Text>
                                            </TouchableOpacity>
                                            */}
                                        </View>
                                    </View>
                                    <View style={styles.pricePerContainer}>
                                        
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
                                    <Text style={styles.timeFrameText}>Time Frame:</Text>
                                    <View style={styles.checkboxContainer}>
                                        {timeFrames.map((timeFrame, index) => (
                                            <TouchableOpacity 
                                                key={index} 
                                                style={[styles.timeFrameOption, styles.checkboxSpacing]}
                                                onPress={() => toggleTimeFrame(timeFrame)}
                                            >
                                                <View style={[
                                                    styles.checkbox,
                                                    selectedTimeFrames[timeFrame] && styles.checkboxSelected
                                                ]} />
                                            <Text style={[styles.timeFrameOptionText]}>
                                                    {timeFrame}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                        <View style={[
                            styles.tagsButtonContainer,
                            filterStates.dateTime && styles.tagsButtonContainerExpanded
                            ]}>
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
                    onClose={() => {updateSelectedTags(selectedTags); setIsTagsModalOpen(false);}}
                    handleTagSelection={handleTagSelection}
                    tagOptions={tagOptions}
                    numTags={numTags}
                />
            </View>
        </KeyboardAvoidingView>
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
    scrollViewContent: {
        flexGrow: 1,
    },
    tagsButtonContainerExpanded: {
        marginBottom: 48,
  
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
        width: '90%',
        height: '58%',
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
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    dateFrameText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginBottom: 10,
    },
    calendarContainer: {
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 6,
        overflow: 'hidden',
        width: '83.5%',
        alignSelf: 'center',
        marginBottom: 15,
    },
    calendar: {   
        marginBottom:-8,
        paddingLeft: 0,
        paddingRight: 0,
    },
    timeFrameText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
    },
    timeFrameOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxContainer: {
        paddingLeft: 12, 
        marginTop: 7, 
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#0653A1',
        borderRadius: 4,
    },
    checkboxSelected: {
        backgroundColor: '#0653A1',
    },
    timeFrameOptionText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    checkboxSpacing: {
        marginTop: -1,
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
        width: 34,
        height: 27,
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
        alignItems: 'center', // Centers items vertically on the same line
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    priceInputContainer: {
        flexDirection: 'row', // Aligns input and other elements in a row
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%', 
    },
    dollarSign: {
        position: 'absolute',
        zIndex: 1, // Ensures dollar sign appears above the TextInput
        left: 10, // Position the dollar sign on the left inside the TextInput
        color: '#0053A1',
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
    },
    priceInputLabel: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginBottom: 5,
    },
    priceInput: {
        borderWidth: 1,
        borderColor: '#b6c1cd', 
        borderRadius: 8, 
        paddingVertical: 10,
        paddingLeft: 30, 
        paddingRight: 15,
        fontFamily: 'NotoSansTaiTham-Regular',
        fontSize: 16,
        backgroundColor: '#f8f9fa', 
        color: '#0053A1', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1, 
        textAlign: 'left', 
        flex: 0.6, 
    },
    pricePerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10, 
    },
    pricePerLabel: {
        fontSize: 14,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginRight: 0,
    },
    pricePerDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0653A1',
        borderRadius: 5,
        paddingHorizontal: 20, // Add more padding for a larger dropdown
        paddingVertical: 10,
        width: 120, // Increase width for a larger dropdown
       
    },
    pricePerDropdownText: {
        color: '#ffffff',
        fontFamily: 'NotoSansTaiTham-Regular',
        marginRight: 3,
        marginLeft: 6
    },
    
    dateTimeContent: {
        width: '92%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: 4,
    },
    resetThisFilterContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    resetThisFilterText: {
        color: '#0653A1',
        textDecorationLine: 'underline',
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
        marginRight: 4,
    },
    dateFrameText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginTop:-3,
        marginBottom:11,
    },
    timeFrameText: {
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Bold',
        marginBottom: 10.5,
    },
    timeFrameOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 4,
    },
    checkbox: {
        width: 25,
        height: 25,
        borderWidth: 2.5,
        borderColor: '#0653A1',
        borderRadius: 7,
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
