import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Avatar } from "@react-native-material/core"; //List items from https://www.react-native-material.com/docs/components/list-item
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainContainer from './Navigation/MainContainer';
import HomeScreen from './Navigation/Screens/HomeScreen';
export default function App() {
  return (
    <MainContainer/>
    


    //Old view for testing
    // <View>
    //   <HomeScreen/>
    //   <NavBar></NavBar>
    // </View>
  );
}
