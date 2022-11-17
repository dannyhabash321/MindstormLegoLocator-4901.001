import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import Modal from "react-native-modal";

function InformationModal() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{top:40}}>
      <TouchableOpacity onPress={toggleModal} style={styles.InformationStyle} >
      <Image 
        source={require('../assets/information.png')} 
        style={styles.ImageIconStyle} 
      />
      </TouchableOpacity>
  
      <Modal 
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.ModalStyle}>

        <Text style={{marginTop:30,marginLeft:20,marginRight:20,fontSize:20, fontWeight:'bold'}}>1. Select the camera button</Text>
        <Text style={{marginTop:30,marginLeft:20,marginRight:20,fontSize:20, fontWeight:'bold'}}>2. Take an aerial shot of the trays</Text>
        <Text style={{marginTop:30,marginLeft:20,marginRight:20,fontSize:20, fontWeight:'bold'}}>3. Select the lego piece you are looking for</Text>
        <Text style={{marginTop:30,marginLeft:20,marginRight:20,fontSize:20, fontWeight:'bold'}}>4. The app will tell you where the lego piece is located on the tray</Text>
        <Text style={{marginTop:30,marginLeft:20,marginRight:20,fontSize:20, fontWeight:'bold'}}>5. If you need additional help finding the lego piece, the app will help you find the piece with sound with Live Feed Mode</Text>
        <Text style={{marginTop:30,marginLeft:20,marginRight:20,fontSize:20, fontWeight:'bold'}}>6. Enjoy the app and have fun! </Text>
        
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
    borderWidth: 3,
    borderColor: '#FFED00',
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
    maxHeight: 600
  },

  ExitButton: {
    // bottom:"1%",
    top: 30,
    left: "10%",
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",
    height: "9%",
    borderRadius: 50,
    backgroundColor: "#ff0000",
},

ExitText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
},

});
export default InformationModal;