import React, {useState, useEffect, useRef} from 'react';
import {Image,View,StyleSheet,Dimensions,Pressable,Modal,Text,ActivityIndicator, Vibration} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {AutoFocus, Camera} from 'expo-camera';
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';
import { useFocusEffect } from '@react-navigation/native';





  //the order of lego IDs based on trained model
  const RESULT_MAPPING = ["370526","370626","370726","370826","373726","4121715","4140806","4142822","4142865","4153707","4153718","4162857","4177431","4177434","4198367","4206482","4211639","4211651","4211713","4211805","4211807","4211815","4211866","4495930","4499858","4502595","4509376","4513174","4514553","4522934","4535768","4539880","4540797","4541326","4542578","4543490","4552347","4565452","4566249","4566251","4582792","4585040","4611705","4640536","4652235","4666579","6007973","6008527","6012451","6028041","6031821","6035364","6083620","6114171","6133119","6173127","6178438","6178439","6178448","6185471","6195314","6227055","6227941","6239012","6261375","6261688","6265091","6268905","6271161","6271167","6271827","6271869","6273715","6275844","6276836","6276854","6276951","6278132","6279881","6280394","6282158","6284188","6284699","6288218","6296844","6310609","6313453","6313520","6321303","6321305","6321744","6325504","6326620","6327548","6331428","6331441","6346535"];
  
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
            <View key = {index+1} style={{zIndex: 100}}>
              <Text style={styles.partLocation}>Part Located!</Text>
                <Text style={styles.partLocationW}>Width:{((Dimensions.get('window').width/400) * prediction.width).toFixed(0)}</Text>
                <Text style={styles.partLocationH}>Height:{(((Dimensions.get('window').height-130)/512)* prediction.height).toFixed(0)}</Text>
                <Text style={styles.partLocationX}>X:{(((prediction.y/512) * (Dimensions.get('window').height-130)) - (((Dimensions.get('window').height-130)/512)* prediction.height/2)).toFixed(0)}</Text>
                <Text style={styles.partLocationY}>Y:{(((prediction.x / 400) * Dimensions.get('window').width) -  ((Dimensions.get('window').width/400) * prediction.width/2)).toFixed(0)}</Text>
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
  partLocation:{
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 85,
    bottom: 70,
    color: "#ff0000",
    opacity: .8,
    zIndex: 75,
    height: 75,
    fontSize: 30,
  },
  partLocationW:{
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 35,
    opacity: .7,
    bottom: 35,
    color: "#ff0000",
    zIndex: 75,
    height: 75,
    fontSize: 15,
  },
  partLocationH:{
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 35,
    bottom: 20,
    opacity: .7,
    color: "#ff0000",
    zIndex: 75,
    height: 75,
    fontSize: 15,
  },
  partLocationX:{
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 35,
    bottom: 0,
    opacity: .7,
    color: "#ff0000",
    zIndex: 75,
    height: 75,
    fontSize: 15,
  },
  partLocationY:{
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 35,
    bottom: -15,
    color: "#ff0000",
    zIndex: 75,
    height: 75,
    opacity: .7,
    fontSize: 15,
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
