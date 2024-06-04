import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import User from '../assets/profile.png';
import Pencil from '../assets/pencil.png';
import MenuSearchBar from './search';
import { updateUser } from '../firebaseFunctions/firebaseFirestore';

function EditProfileScreen({ navigation, route }) {
    const { user, onProfileUpdate } = route.params;
    const defaultBio = "Hello! Please feel free to reach out about any concerns. I'm very flexible!";
    const [updatedUser, setUpdatedUser] = React.useState({
        ...user,
        bio: user.bio || defaultBio,
    });

    const handleSave = () => {
        updateUser(updatedUser).then(() => {
            onProfileUpdate(updatedUser);
            navigation.goBack();
        }).catch((error) => {
            console.error('Error updating profile:', error);
        });
    };

    const handleInputChange = (field, value) => {
        setUpdatedUser({ ...updatedUser, [field]: value });
    };

    return (
        <View style={styles.container}>
            <MenuSearchBar showSearchBar={false} />
            <View style={styles.headerContainer}>
                <View style={styles.headerSpacer} />
                <Text style={styles.headerText}>Edit Profile</Text>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
                <Image
                    source={User}
                    style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editCircle}>
                    <Image
                        source={Pencil}
                        style={styles.pencilImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Display name</Text>
                    <TextInput
                        style={styles.input}
                        value={updatedUser.fullName}
                        onChangeText={(text) => handleInputChange('fullName', text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Bio (optional)</Text>
                    <TextInput
                        style={[styles.input, styles.bioInput]}
                        value={updatedUser.bio}
                        onChangeText={(text) => handleInputChange('bio', text)}
                        multiline
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={updatedUser.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone number</Text>
                    <TextInput
                        style={styles.input}
                        value={updatedUser.phoneNumber}
                        onChangeText={(text) => handleInputChange('phoneNumber', text)}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 27,
        paddingHorizontal: 20,
    },
    headerSpacer: {
        width: 79,
    },
    headerText: {
        fontSize: 28,
        fontFamily: 'NotoSansTaiTham-Bold',
        textAlign: 'center',
    },
    profileContainer: {
        alignSelf: 'center',
        position: 'relative',
        marginTop: -15,
    },
    profileImage: {
        width: 190,
        height: 190,
        borderRadius: 95,
    },
    editCircle: {
        width: 50,
        height: 50,
        backgroundColor: '#D9D9D9',
        borderRadius: 25,
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pencilImage: {
        width: 30,
        height: 30,
    },
    formContainer: {
        alignItems: 'center',
        marginTop: 12.5,
    },
    inputContainer: {
        width: 300,
        marginBottom: 12,
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        fontFamily: 'NotoSansTaiTham-Normal',
        marginBottom: 5,
        alignSelf: 'flex-start',
        paddingHorizontal: 13,
    },
    input: {
        borderRadius: 17,
        backgroundColor: '#E9E9E9',
        width: 310,
        height: 43,
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
        paddingHorizontal: 18,
        textAlign: 'left',
    },
    bioInput: {
        height: 137,
        paddingVertical: 10,
        paddingHorizontal: 18,
        textAlign: 'left',
    },
    saveButton: {
        backgroundColor: '#0653A1',
        borderRadius: 15,
        width: 79,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -5,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'NotoSansTaiTham-Regular',
        textAlign: 'center',
        paddingVertical: 3.5,
    },
});

export default EditProfileScreen;
