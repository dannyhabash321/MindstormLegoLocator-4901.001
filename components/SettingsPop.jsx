import React, { useState, useContext } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import Modal from "react-native-modal";
import { Switch } from "@react-native-material/core";
// for theming page: react useContext and below
import themeContext from '../config/themeContext';
import ttsContext from "../config/ttsContext";
import { EventRegister } from 'react-native-event-listeners';
import Feather from 'react-native-vector-icons/Feather'; // Icon from https://github.com/oblador/react-native-vector-icons

function SettingsModal() {
    const theme = useContext(themeContext);
    const [themeMode, setThemeMode] = useState(false);

    const ttsChoice = useContext(ttsContext);
    const [ttsMode, setTtsMode] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  // theme


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
// source= theme.theme == "dark" ? require('../assets/information.png') : require('../assets/lightInfo.png')
  return (
    <View style={{top:40, backgroundColor: theme.background}}>
      <TouchableOpacity onPress={toggleModal} style={{...styles.InformationStyle, backgroundColor: theme.background}} >
      <Feather style={{ marginTop: -50, position:'relative', marginLeft: -360, width: 50, height: 50, color: theme.theme == "light" ? "#000000" : "white"  }} name="settings" size={35} backgroundColor={"#ffffff"} 
      
      />
      </TouchableOpacity>
  
      <Modal 
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={{...styles.ModalStyle, backgroundColor: theme.background}}>

        <Text style={{marginTop:30, marginLeft:30,fontSize:32, fontWeight:'bold', color: theme.color}}>Settings</Text>
        <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:50}}>
            <Switch style={{flexDirection:'row', alignItems:'center',marginLeft:0,marginTop:-20}} value={themeMode} onValueChange={(value) => {
              
              setThemeMode(value);
              EventRegister.emit("changeTheme", value);
              
              
              }} onPress={() => setThemeMode(!themeMode)}
            />
            
            
            
            <Text style={ {...styles.text, color: theme.color,marginTop:-20}}>Dark Mode</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:10}}>
            </View>

            <Text style={{marginTop:20, marginLeft:30,fontSize:32, fontWeight:'bold', color: theme.color}}>Accessibility Settings</Text>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:30}}>
            <Switch value={ttsMode} onValueChange={(value) => {
              
              setTtsMode(value);
              EventRegister.emit("changeTts", value);
              
              
              }} onPress={() => setTtsMode(!ttsMode)}
            />


            <Text style={ {...styles.text, color: theme.color,marginTop:0}}>Text To Speech</Text>
            </View>
        
        <Pressable style={styles.ExitButton} onPress={toggleModal}>
          <Text style={styles.ExitText}>Exit</Text>
        </Pressable>
        
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  InformationStyle: {
    marginLeft: 'auto',
    backgroundColor: '#FFFFFF',
    // borderWidth: 3,
    width: 40,
    height: 40,
    borderRadius: 5,
    margin: 5,
  },

  InformationStyleAfter: {
    marginRight: 'auto',
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#FFED00',
    width: 40,
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
   
  ImageIconStyle: {
     padding: 10,
     margin: 3,
     height: 30,
     width: 30,   
  },

  ModalStyle: {
    flex:1, 
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    maxHeight: 400
  },

  ExitButton: {
    // bottom:"1%",
    top: 40,
    left: "10%",
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",
    height: "15%",
    borderRadius: 50,
    backgroundColor: "#ff0000",
  },

  ExitText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
  },

  text: {
    marginTop:30,
    marginLeft:20,
    marginRight:20,
    fontSize:20, 
    fontWeight:'bold'
  }

});
export default SettingsModal;