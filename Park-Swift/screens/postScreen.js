import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MenuSearchBar from './search';
import Dropdown from '../assets/Down.png';

function CustomDropdown({ selectedValue, onValueChange, options }) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>{selectedValue}</Text>
        <Image source={Dropdown} style={styles.dropdownImage} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {options.map((option) => (
            <TouchableOpacity key={option} style={styles.modalOption} onPress={() => handleSelect(option)}>
              <Text style={styles.modalOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

function CreatePost({ navigation, route }) {
  const [location, setLocation] = React.useState('');
  const [startTime, setStartTime] = React.useState({ hours: '', minutes: '' });
  const [endTime, setEndTime] = React.useState({ hours: '', minutes: '' });
  const [startPeriod, setStartPeriod] = React.useState('AM');
  const [endPeriod, setEndPeriod] = React.useState('AM');
  const [price, setPrice] = React.useState('');
  const [size, setSize] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [notes, setNotes] = React.useState('');
  const [selectedDates, setSelectedDates] = React.useState({});
  const [showCalendar, setShowCalendar] = React.useState(false);

  const handleDateSelect = (day) => {
    const updatedSelectedDates = { ...selectedDates };
    if (updatedSelectedDates[day.dateString]) {
      delete updatedSelectedDates[day.dateString];
    } else {
      updatedSelectedDates[day.dateString] = { selected: true, selectedColor: '#0653A1' };
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

  return (
    <ScrollView style={styles.container}>
      <MenuSearchBar showSearchBar={false} />
      <Text style={styles.title}>List Your Space</Text>
      
      <Text style={styles.subHeading}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="5678 Place Ave"
        placeholderTextColor="#A8A8A8"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.subHeading}>Start Time</Text>
      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          placeholder="1"
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
        <CustomDropdown
          selectedValue={startPeriod}
          onValueChange={setStartPeriod}
          options={['AM', 'PM']}
        />
      </View>

      <Text style={styles.subHeading}>End Time</Text>
      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          placeholder="10"
          placeholderTextColor="#A8A8A8"
          keyboardType="numeric"
          value={endTime.hours}
          onChangeText={(text) => setEndTime({ ...endTime, hours: text })}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.timeInput}
          placeholder="30"
          placeholderTextColor="#A8A8A8"
          keyboardType="numeric"
          value={endTime.minutes}
          onChangeText={(text) => setEndTime({ ...endTime, minutes: text })}
        />
        <CustomDropdown
          selectedValue={endPeriod}
          onValueChange={setEndPeriod}
          options={['AM', 'PM']}
        />
      </View>

      <Text style={styles.subHeading}>Available dates</Text>
      <TouchableOpacity style={styles.calendarButton} onPress={() => setShowCalendar(!showCalendar)}>
        <Text style={styles.calendarButtonText}>
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </Text>
      </TouchableOpacity>
      {showCalendar && (
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
      )}

      <Text style={styles.subHeading}>Price</Text>
      <View style={styles.priceContainer}>
        <TextInput
          style={styles.priceInput}
          placeholder="$0.00"
          placeholderTextColor="#A8A8A8"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <CustomDropdown
          selectedValue="$ / sem-hr"
          onValueChange={() => {}}
          options={['$ / sem-hr', '$ / hour', '$ / day']}
        />
      </View>

      <Text style={styles.subHeading}>Size</Text>
      <CustomDropdown
        selectedValue={size || "Select"}
        onValueChange={setSize}
        options={['Small', 'Medium', 'Large']}
      />

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

      <TouchableOpacity style={styles.listButton}>
        <Text style={styles.listButtonText}>List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: "NotoSansTaiTham-Bold",
    fontSize: 29,
    letterSpacing: -1,
    marginTop: '6.3%',
    marginLeft: '3.5%',
    marginBottom: '3%',
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
    width: 75,
    height: 40,
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
  calendarButton: {
    backgroundColor: '#E9E9E9',
    borderRadius: 17,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginLeft: '3.5%',
    marginRight: '3.5%',
  },
  calendarButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  calendar: {
    marginVertical: 20,
    marginHorizontal: '3.5%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3.5%',
    marginRight: '3.5%',
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderRadius: 17,
    fontSize: 16,
    color: '#000000',
    fontFamily: "NotoSansTaiTham-Regular",
    backgroundColor: '#E9E9E9',
    paddingHorizontal: 14,
    marginRight: 10,
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
    backgroundColor: '#007AFF',
    borderRadius: 17,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addTagButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  listButton: {
    backgroundColor: '#007AFF',
    borderRadius: 17,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '3.5%',
    marginRight: '3.5%',
    marginTop: '5%',
    marginBottom: '5%',
  },
  listButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreatePost;