import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import User from '../assets/profile.png';
import Pencil from '../assets/pencil.png';
import MenuSearchBar from '../components/MenuSearchBar';
import { updateUser } from '../firebaseFunctions/firebaseFirestore';
import * as ImagePicker from 'expo-image-picker';

function EditProfileScreen({ navigation, route }) {
    const { user, onProfileUpdate } = route.params;
    const defaultBio = "Hello! Please feel free to reach out about any concerns. I'm very flexible!";
    const [updatedUser, setUpdatedUser] = React.useState({
        ...user,
        bio: user.bio == undefined ? defaultBio : user.bio,
        profileImage: user.profileImage || null,
    });
    const [modalVisible, setModalVisible] = React.useState(false);
    const handleSave = () => {
        if (!updatedUser.fullName.trim()) {
            alert("Display name is required.");
            return;
        }
    
        updateUser(updatedUser)
            .then(() => {
                onProfileUpdate(updatedUser);
                navigation.goBack();
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };    

    const handleInputChange = (field, value) => {
        setUpdatedUser({ ...updatedUser, [field]: value });
    };

    const clickOutsideModal = () => {
        setModalVisible(false);
    };

    const handleImageChange = (image) => {
        setUpdatedUser({...updatedUser, profileImage: image});
        //handleSave();
    };


    // Image picker code
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        try {
            if (!result.canceled && result.assets && result.assets.length > 0) {
                handleImageChange(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image, please try again: ', error);
            // Console Logging for Debugging
            console.log('Error at ', Date.now(), "Error: ", error);
        } finally {
            // Console Logging
            console.log('Image successfully picked at ', Date.now());
            console.log('Image URI: ', result.assets[0].uri);
        }

        setModalVisible(false);
    };

    const removePhoto = () => {
        if (updatedUser.profileImage === null) {
            console.error('No profile image to remove');
        } else {
            handleImageChange(null);
            setModalVisible(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? 'padding' : 'height'}
            style={{flex: 1}}>
            <View style={styles.container}>
                <MenuSearchBar showSearchBar={false} />
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerSpacer} />
                        <Text style={styles.headerText}>Edit Profile</Text>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileContainer}>
                        <Image
                            source={updatedUser.profileImage ? { uri: updatedUser.profileImage } : User}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.editCircle} onPress={() => setModalVisible(true)}>
                        <Image source={Pencil} style={styles.pencilImage} /></TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Display Name:</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedUser.fullName}
                                onChangeText={(text) => handleInputChange('fullName', text)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Bio (Optional):</Text>
                            <TextInput
                                style={[styles.input, styles.bioInput]}
                                value={updatedUser.bio}
                                onChangeText={(text) => handleInputChange('bio', text)}
                                multiline
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address:</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedUser.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number:</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedUser.phoneNumber}
                                onChangeText={(text) => handleInputChange('phoneNumber', text)}
                                keyboardType = "phone-pad"
                            />
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={clickOutsideModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>Profile Options</Text>
                            <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
                                <Text style={styles.modalOptionText}>Upload Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={removePhoto}>
                                <Text style={styles.modalOptionText}>Remove Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalOptionText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 24,
        borderBottomWidth: 1.2,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    headerSpacer: {
        width: 80,
    },
    headerText: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        fontWeight: '600',
        color: '#1A1A1A',
    },
    profileContainer: {
        alignSelf: 'center',
        marginTop: 32,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    profileImage: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    editCircle: {
        width: 44,
        height: 44,
        backgroundColor: '#0653A1',
        borderRadius: 22,
        position: 'absolute',
        bottom: 8,
        right: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    pencilImage: {
        width: 20,
        height: 20,
        tintColor: '#FFF',
    },
    formContainer: {
        paddingHorizontal: 24,
        marginTop: 32,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        color: '#444',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 12,
    },
    saveButton: {
        backgroundColor: '#0653A1',
        borderRadius: 16,
        paddingHorizontal: 32,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingVertical: 24,
        paddingHorizontal: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: '#1A1A1A',
    },
    modalOption: {
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    modalOptionText: {
        fontSize: 17,
        color: '#0653A1',
        fontWeight: '500',
    },
    scrollViewContainer: {
        paddingBottom: '30%',
        paddingTop: 16,
    },
});

export default EditProfileScreen;
