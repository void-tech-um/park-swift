import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';

const ProfileCard = () => (
  <Card.Title
    title="Name" style = {{backgroundColor: '#bbbbbb', fontWeight: "bold", flexDirection: 'row', alignSelf: 'center', margin: "3%", padding: "6%"}}
    subtitle="example@gmail.com"
    left={(props) => <Avatar.Icon {...props} icon="account-circle-outline" style = {{backgroundColor: '#ADD8E6'}} />}
  />
);

export default ProfileCard;