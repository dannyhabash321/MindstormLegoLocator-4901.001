import React, {useState, useEffect, useRef} from 'react';
import {Image,View,StyleSheet,Dimensions,Pressable,Modal,Text,ActivityIndicator, Vibration} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {AutoFocus, Camera} from 'expo-camera';
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';
import { useFocusEffect } from '@react-navigation/native';





  //camera screen function with navigation as argument
  function LocateScreen({route,navigation}){
    

    useFocusEffect(
      React.useCallback(() => {
        // Useful for cleanup functions
        return () => {
          try{
            navigation.setParams({partId: null});
            
          }
          catch(e){

          }
          
        };
      }, []));



    const textureDims = Platform.OS === 'ios' ?
  {
    height: 1920,
    width: 1080,
  } :
  {
    height: 1200,
    width: 1600,
  };

    //camera permissions
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  

    let cameraRef = useRef();


    let frame1 = 0;
    const computeRecognitionEveryNFrames1 = 60;
    function takePic(){
      
      const loop = async () => {
        try{
          if(frame1 % computeRecognitionEveryNFrames1 === 0){
            let options = {
              base64: true,
            };
            
            
            let image = await cameraRef.current.takePictureAsync(options);
            
            const actions = [
              {
                resize: {
                  width: 400,
                  height: 512,
                },
              },
            ];
            const saveOptions = {
              format: ImageManipulator.SaveFormat.JPEG,
              base64: true,
            };
            image =  await ImageManipulator.manipulateAsync(image.uri, actions, saveOptions);
            // image = await loadImageBase64(image.uri);
            // MediaLibrary.saveToLibraryAsync(image.uri)
      
            axios({
                method: "POST",
                url: "https://detect.roboflow.com/lego-detection-fsxai/8",
                params: {
                    api_key: "uOLEkn7ugJbDKQy6Gu0k"
                },
                data: image.base64,
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
              }
        
            })
            .then(function(response) {
              let res = []
              try{
                if (route.params.partId){
                  // console.log("ran")

                    for(var i = 0; i < response.data.predictions.length; i++ ){
                      if(response.data.predictions[i].class === route.params.partId){
                        res = [response.data.predictions[i]];
                        setPartLocation(true)
                        Vibration.vibrate();
                      }
                  }
                }else{
                  res = response.data.predictions
                }
              }
              catch(e){
                res = response.data.predictions
              }finally{
                setLegoLocations(res)
              }
                
    
            })
            .catch(function(error) {
                console.log(error.message);
            });
            requestAnimationFrame(loop);
          
        }
      }
      catch(error){
        return
      }
      }
      
        loop()
      
    };





    //unused maybe useful variables
    // const [isProcessing, setIsProcessing] = useState(false);


    //this is where the state of prediction is updated
    const [legoPrediction, setLegoPrediction] = useState(null);
  
    //prediction state to show prediction modal
    const [showPrediction, setShowPrediction] = useState(false) 

    const [legoLocations, setLegoLocations] = useState([])

    const [partLocation, setPartLocation] = useState(false)
    
  
    const legos = require('../../assets/database.json')
    
    //speech function
    const speakPrediction = () => {
      const textToSay = 'LEGO piece Predicted' + legoPrediction[0].PartName;
      Speech.speak(textToSay);

    };
  // const speakDismiss = () => {
  //     const textToSay = 'Dismiss';
  //     Speech.speak(textToSay);
  //   };
  







    useEffect(() => {
        (async () => {
          //checks permissions
          const cameraPermission = await Camera.requestCameraPermissionsAsync();
          const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
          setHasCameraPermission(cameraPermission.status === "granted");
          setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
          

        })();
      }, []);


      if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
      } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
      }




    return (
      <View style={styles.container}>
      {/* this is the prediction modal */}
        <Modal visible={showPrediction} transparent={true} animationType="slide" >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              {/* if theres a prediction ready, it is displayed to user, else it is just the loading screen */}
              {legoPrediction ? 
                [
                  <Text key= {0} style={{ fontSize: 30, color:"black", fontWeight:'bold'}}onPress={speakPrediction}> {"Prediction: " + legoPrediction[1] + "%"}</Text>,
                  <Image
                  key = {1}
                  style={{ width: '50%', height: "50%", resizeMode: 'contain' }}
                  source={{ uri: legoPrediction[0].ImageURL }}
                  />,
                  <Text key = {2}>{legoPrediction[0].PartName}</Text>,
                  // takes user to the full part information if they desire
                  <Pressable key = {3}
                    style={styles.goToPartButton}
                    onPress={() => {
                      navigation.navigate('Lego',{ item:legoPrediction[0]})
                      setShowPrediction(false)
                      setLegoPrediction(null)
                      
                      
                    }}>
                    <Text>Go To Part Page</Text>
                  </Pressable> 
                ]:
                <ActivityIndicator size="large" />
              }
              {/* dismiss button that serves as cancel even if there is no prediction */}
              <Pressable
                style={styles.dismissButton}
                onPress={() => {
                  setShowPrediction(false)
                  setLegoPrediction(null)
                }}>
                <Text>Dismiss</Text>
              </Pressable>
            </View>
          </View>
        </Modal>


      <Camera style={styles.container} ref={cameraRef} onCameraReady={()=>takePic()}/>
      
      {legoLocations.map((prediction, index) => (
        [
        <View  key = {index} onStartShouldSetResponder={() => { {
          for (var i = 0; i < legos.length; i++){
            if (legos[i].PartID === prediction.class){
              setLegoPrediction([legos[i], prediction.confidence.toFixed(2) * 100 ])
            };
          }
          setShowPrediction(true);
        } }} style={[styles.box, {
          width:  (Dimensions.get('window').width/400) * prediction.width, 
          height: ((Dimensions.get('window').height-130)/512)* prediction.height,
          top: ((prediction.y/512) * (Dimensions.get('window').height-130)) - (((Dimensions.get('window').height-130)/512)* prediction.height/2), 
          left: ((prediction.x / 400) * Dimensions.get('window').width) -  ((Dimensions.get('window').width/400) * prediction.width/2),
          // left:  prediction.x
          // width: 428, 400, 415
          // height: 796, 512, 605  
          // left: ,
          // right:  
          }]}
          >
            
            <Text style ={styles.predictionClass}>{prediction.class} ({prediction.confidence.toFixed(2) * 100}%)</Text>
          </View>,
          
        
          partLocation && 
            <View key = {index+1} style={ styles.partLocationContainer}>
                <Text style={ [{fontSize: 30,left: '6%',color: "#ff0000",}]}>Part Located!</Text>
                <Text style={ styles.partLocationText}>Width:{((Dimensions.get('window').width/400) * prediction.width).toFixed(0)}</Text>
                <Text style={ styles.partLocationText}>Height:{(((Dimensions.get('window').height-130)/512)* prediction.height).toFixed(0)}</Text>
                <Text style={ styles.partLocationText}>X:{(((prediction.y/512) * (Dimensions.get('window').height-130)) - (((Dimensions.get('window').height-130)/512)* prediction.height/2)).toFixed(0)}</Text>
                <Text style={ styles.partLocationText}>Y:{(((prediction.x / 400) * Dimensions.get('window').width) -  ((Dimensions.get('window').width/400) * prediction.width/2)).toFixed(0)}</Text>
            </View>]
          
        
      ))}
       
      </View>
    );
  };





//css themes for UI
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
  partLocationContainer:{
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 90,
    bottom: 30,
    backgroundColor: "white",
    opacity: .5,
    zIndex: 100,
    height: 120,
    borderRadius: 10,
    width: 185,

    // justifyContent: 'center',
    margin: 'auto',
  },
  partLocationText:{
    left: '30%',
    color: "#ff0000",
  },

  camera: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
    
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 450,
    borderRadius: 24,
    backgroundColor: '#ffffff',
  },
  goToPartButton: {
    width: 150,
    height: 50,
    marginTop: 20,
    borderRadius: 24,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
  },
  dismissButton: {
    width: 150,
    height: 50,
    marginTop: 10,
    borderRadius: 24,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dae0db',
  },
  box: {
    borderWidth: 2,
    backgroundColor: "transparent",
    position: 'absolute',
    zIndex: 75,
    borderColor: "#ff0000",
  },
  predictionClass:{
    position: 'absolute',
    color: '#ff0000',
    top: -20,
    width: 1000,
  }
 
});

export default LocateScreen;
