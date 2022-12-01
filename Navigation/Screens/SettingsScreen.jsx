//import * as React from 'react';
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Divider,Stack, Switch } from "@react-native-material/core";
import SwitchSelector from "react-native-switch-selector";

import { EventRegister } from 'react-native-event-listeners';
import themeContext from "../../config/themeContext";

import textIncreaseContext from "../../config/textIncreaseContext";

function SettingsScreen({navigation}){
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);

    const textIncrease = useContext(textIncreaseContext);
    const [textSize, setTextSize] = useState(1);

    const textSwitchOptions = [
      { label: "Small", value: 1 },
      { label: "Medium", value: 1.5 },
      { label: "Large", value: 2 }
    ];
    return(
        <View style={[styles.container, {backgroundColor: theme.background}]}>

            <Text style={{marginTop:100, marginLeft:50,fontSize: (32 * textSize), fontWeight:'bold', color: theme.color}}>Settings</Text>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:50}}>
            <Switch value={mode} onValueChange={(value) => {
              
              setMode(value);
              EventRegister.emit("changeTheme", value);
              
              
              }} onPress={() => setMode(!mode)}/>
            
            
            
            <Text style={ {...styles.text, color: theme.color}}>Dark Mode</Text>
            </View>
            <Text style={{marginTop:100, marginLeft:50,fontSize:32, fontWeight:'bold', color: theme.color}}>Accessibility</Text>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:10}}>


            <SwitchSelector
            options={textSwitchOptions}
              initial={0}
              onValueChange={(value) => {
                setTextSize(value);
                EventRegister.emit("changeTextSize", value);
                {console.log("poggers")};
              }} onPress={value =>{console.log(value)}}
              //  * {textIncrease}
              // () => setTextSize(value)
              // onPress={value => this.setState({ gender: value })}
              // textColor={colors.purple} //'#7a44cf'
              // selectedColor={colors.white}
              // buttonColor={colors.purple}
              // borderColor={colors.purple}
              testID="gender-switch-selector"
              accessibilityLabel="gender-switch-selector"
            />

            {/* <SwitchSelector
              initial={0}
              onPress={value => this.setState({ gender: value })}
              // textColor={colors.purple} //'#7a44cf'
              // selectedColor={colors.white}
              // buttonColor={colors.purple}
              // borderColor={colors.purple}
              hasPadding
              options={[
                { label: "Feminino", value: "f"}, //images.feminino = require('./path_to/assets/img/feminino.png')
                { label: "Masculino", value: "m"} //images.masculino = require('./path_to/assets/img/masculino.png')
              ]}
              testID="gender-switch-selector"
              accessibilityLabel="gender-switch-selector"
            /> */}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    button: {
        marginTop:50  
    },
    main:{
      flex:2,
      justifyContent: "center",
      alignItems: "center",
    },
    text:{
      marginLeft:10,
      fontSize:20,
    }
  });
export default SettingsScreen