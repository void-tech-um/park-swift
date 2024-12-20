import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ListSpaceButton({onPress}) {
    const navigation = useNavigation();

    const handlePress = () => {
        onPress(); 
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>List Space</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        top:20,
    },
    button: {
        backgroundColor: '#959595',
        padding: 20,
        borderRadius: 50,
        width:200,
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

