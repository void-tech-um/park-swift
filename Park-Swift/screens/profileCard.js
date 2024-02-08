import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';

const ProfileCard = () => (
  <Card.Title
    title="Name" style = {{backgroundColor: 'grey', fontWeight: "bold"}}
    subtitle="example@gmail.com"
    left={(props) => <Avatar.Icon {...props} icon="account-circle-outline" style = {{backgroundColor: '#ADD8E6'}} />}
    style = {{backgroundColor: '#bbbbbb', marginTop: 40, width: 375, height:100, alignSelf: 'center'}}
  />
);

export default ProfileCard;