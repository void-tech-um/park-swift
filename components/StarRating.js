import * as React from "react";
import Stars from 'react-native-stars';
import { StyleSheet, View} from "react-native";

const StarRating = () =>{
    return(
        <View style={{alignItems:'center'}}>
        <Stars
            display={3.5}
            spacing={8}
            count={5}
            starSize={40}
            fullStar= {require('../star_images/starFilled.png')}
            emptyStar= {require('../star_images/starEmpty.png')}/>
        </View>
    );
};



export default StarRating;