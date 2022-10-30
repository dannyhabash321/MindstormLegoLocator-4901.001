import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'; // Icon from https://github.com/oblador/react-native-vector-icons
import EvilIcons from 'react-native-vector-icons/EvilIcons';// Icon from https://github.com/oblador/react-native-vector-icons
import Entypo from 'react-native-vector-icons/Entypo'; //Icon from https://github.com/oblador/react-native-vector-icons



//Screens
import HomeScreen from './Screens/HomeScreen'
import CameraScreen from './Screens/CameraScreen'
import SettingsScreen from './Screens/SettingsScreen'

//Screen Names
const homeName = 'Home'
const cameraName = "Camera";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarStyle: { height: 130 },
            tabBarIcon: ({ focused, color, size }) => {
              let outlined;
              let rn = route.name;
  
              if (rn === homeName) {
                outlined = focused ? '#ff0000' : '#808080';
                return (
                    <View>
                        <Entypo name="home" size={40} color={outlined} backgroundColor={"#ffffff"} />
                        <Text style={{color:outlined, fontSize:20,position:'relative',left:-5,bottom:-3,textAlign:'center'}}>Home</Text>
                    </View>
                )
                
              } else if (rn === cameraName) {
                outlined = focused ? '#ff0000' : '#808080';
                return (
                    <View>
                        <EvilIcons name="camera" size={50} color={outlined} backgroundColor={"#ffffff"} />
                        <Text style={{color:outlined, fontSize:20,position:'relative',left:-10,bottom:-3,textAlign:'center'}}>Camera</Text>
                    </View>
                )
  
              } else if (rn === settingsName) {
                outlined = focused ? '#ff0000' : '#808080';
                return (
                    <View>
                        <Feather style={{ marginBottom: 0 }} name="menu" size={40} color={outlined} backgroundColor={"#ffffff"} />
                        <Text style={{color:outlined, fontSize:20,position:'relative',left:-5,bottom:-3,textAlign:'center'}}>Menu</Text>
                    </View>
                )
              }
  
            },
          })}>
  
          <Tab.Screen options={{headerShown: false}} name={homeName} component={HomeScreen} />
          <Tab.Screen options={{headerShown: false}} name={cameraName} component={CameraScreen} />
          <Tab.Screen options={{headerShown: false}} name={settingsName} component={SettingsScreen} />
  
        </Tab.Navigator>
      </NavigationContainer>
    );

}