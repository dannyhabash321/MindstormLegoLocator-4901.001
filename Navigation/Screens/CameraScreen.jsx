import React, {useRef, useState, useEffect} from 'react';
import {View,StyleSheet,Dimensions,Pressable,Modal,Text,ActivityIndicator,} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {getModel,convertBase64ToTensor,startPrediction} from '../../helpers/tensor-helper';
import {cropPicture} from '../../helpers/image-helper';
import {Camera} from 'expo-camera';
import {Base64Binary} from '../../utils/utils';
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import {bundleResourceIO, decodeJpeg, fetch} from '@tensorflow/tfjs-react-native';

const initialiseTensorflow = async () => {
  await tf.ready();
  tf.getBackend(); 
}


// async function imageToTensor(source) {
  
//   // load the raw data of the selected image into an array
//   const response = await fetch(source.uri, {}, { isBinary: true });
//   const rawImageData = await response.arrayBuffer();
//   const { width, height, data } = jpeg.decode(rawImageData, {
//     useTArray: true, // Uint8Array = true
//   });

//   // remove the alpha channel:
//   const buffer = new Uint8Array(width * height * 3);
//   let offset = 0;
//   for (let i = 0; i < buffer.length; i += 3) {
//     buffer[i] = data[offset];
//     buffer[i + 1] = data[offset + 1];
//     buffer[i + 2] = data[offset + 2];
//     offset += 4;
//   }

//   // transform image data into a tensor
//   const img = tf.tensor3d(buffer, [width, height, 3]); 

//   // calculate square center crop area
//   const shorterSide = Math.min(width, height);
//   const startingHeight = (height - shorterSide) / 2;
//   const startingWidth = (width - shorterSide) / 2;
//   const endingHeight = startingHeight + shorterSide;
//   const endingWidth = startingWidth + shorterSide;

//   // slice and resize the image
//   const sliced_img = img.slice(
//     [startingWidth, startingHeight, 0],
//     [endingWidth, endingHeight, 3]
//   );
//   const resized_img = tf.image.resizeBilinear(sliced_img, [224, 224]);
  
//   // add a fourth batch dimension to the tensor
//   const expanded_img = resized_img.expandDims(0);
  
//   // normalise the rgb values to -1-+1
//   return expanded_img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
// }


const TensorCamera = cameraWithTensors(Camera);

const modelJson = require('../../model/model.json');
const modelWeights = require('../../model/weights.bin');
const modelMetaData = require('../../model/metadata.json');

const RESULT_MAPPING = ['grey', 'tan', 'red','green'];
const CameraScreen = () => {
  
//   const textureDims = Platform.OS === 'ios' ?
// {
//   height: 1920,
//   width: 1080,
// } :
// {
//   height: 1200,
//   width: 1600,
// };

  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentedShape, setPresentedShape] = useState('');

  

  useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        await initialiseTensorflow();
      })();
    }, []);


    if (hasCameraPermission === undefined) {
      return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
      return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }


    let frame = 0;
    const computeRecognitionEveryNFrames = 60;

    const handleCameraStream = async (images: IterableIterator<tf.Tensor3D>) => {
      const model = await tf.loadLayersModel(bundleResourceIO(modelJson,
        modelWeights));
        
      const loop = async () => {
            if(frame % computeRecognitionEveryNFrames === 0){

                const nextImageTensor = images.next().value;


                const imageData2 = tf.image.resizeBilinear(nextImageTensor,[224,224])   
                const fin = tf.expandDims(imageData2, 0);
                const normalized = fin.cast('float32').div(127.5).sub(1);
                const prediction = await startPrediction(model, normalized);
                
                const highestPrediction = prediction.indexOf(
                  Math.max.apply(null, prediction),
                );
                console.log("Shape: " + RESULT_MAPPING[highestPrediction])
                console.log("Confidence: %" + Number(100*prediction[highestPrediction]).toFixed(1))
                console.log(" ")
                console.log(" ")
                tf.dispose([normalized]);
              
            }
            frame += 1;
            frame = frame % computeRecognitionEveryNFrames;
         
          requestAnimationFrame(loop);
        }
        loop();
    }

  // const handleImageCapture = async () => {
  //   setIsProcessing(true);
  //   const imageData = await cameraRef.current.takePictureAsync({
  //     base64: true,
  //     quality: 1,
  //   });
  //   processImagePrediction(imageData);
  // };

  // const processImagePrediction = async (base64Image) => {
  //   const croppedData = await cropPicture(base64Image, 300);
  //   const model = await getModel();
  //   const tensor = await convertBase64ToTensor(croppedData.base64);
  //   console.log(tensor.value)

  //   // MediaLibrary.saveToLibraryAsync(croppedData.uri)

  //   const prediction = await startPrediction(model, tensor);
  //   console.log(prediction)
  //   const highestPrediction = prediction.indexOf(
  //     Math.max.apply(null, prediction),
  //   );
  //   setPresentedShape(RESULT_MAPPING[highestPrediction]);

  // };

    

//my own
  const handleImageCapture = async () => {
    setIsProcessing(true);
    const model = await getModel();
    // const imageData = await cameraRef.current.takePictureAsync({
    //   base64: true,
    //   quality: 1,
    // });

    // var data = context.getImageData(x, y, 1, 1).data;
    // var rgb = [ data[0], data[1], data[2] ];



    try {
      const imageData = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 1,
        });

      if (imageData) {
        const source = { uri: imageData.uri };
        // setImage(source); // put image path to the state
        const imageTensor = await imageToTensor(source);
         
        // prepare the image
        
         // const layerNormalizationLayer = tf.layers.layerNormalization();
        // const imageTensor2= layerNormalizationLayer.apply(imageTensor)
        // imageTensor2.print()

        const img = tf.image.resizeBilinear(imageTensor, [224, 224]).div(tf.scalar(127).sub(1))
        img = tf.cast(img, dtype = 'float32');



        // const prediction = await startPrediction(model, imageTensor2); // send the image to the model
        // console.log(prediction) // put model prediction to the state
        // const highestPrediction = prediction.indexOf(
        //   Math.max.apply(null, prediction),
        // );
        // setPresentedShape(RESULT_MAPPING[highestPrediction]);

      }
    } catch (error) {
      console.log(error);
    }







    
  
    
    // const imageData2 = tf.image.resizeBilinear(imageData,[224,224])   

    // const uIntArray = Base64Binary.decode(imageData2);
    // const decodedImage = decodeJpeg(uIntArray, 3);

    // const ten = tf.image.resizeBilinear(decodedImage, [224, 224]);

    // const fin = tf.expandDims(ten, 0);
    // const prediction = await startPrediction(model, fin);
    // console.log(prediction)
    // const highestPrediction = prediction.indexOf(
    //   Math.max.apply(null, prediction),
    // );
    // setPresentedShape(RESULT_MAPPING[highestPrediction]);
  };

  // const processImagePrediction = async (base64Image) => {
  //   const croppedData = await cropPicture(base64Image, 300);
  //   const model = await getModel();
  //   const tensor = await convertBase64ToTensor(croppedData.base64);

  //   MediaLibrary.saveToLibraryAsync(croppedData.uri)

  //   const prediction = await startPrediction(model, tensor);
  //   console.log(prediction)
  //   const highestPrediction = prediction.indexOf(
  //     Math.max.apply(null, prediction),
  //   );
  //   setPresentedShape(RESULT_MAPPING[highestPrediction]);

  // };


  return (
    <View style={styles.container}>
      <Modal visible={isProcessing} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>Your current shape is {presentedShape}</Text>
            {presentedShape === '' && <ActivityIndicator size="large" />}
            <Pressable
              style={styles.dismissButton}
              onPress={() => {
                setPresentedShape('');
                setIsProcessing(false);
              }}>
              <Text>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


      <TensorCamera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onReady={(tensors)=>handleCameraStream(tensors)}
        resizeHeight={224}
        resizeWidth={224}
        resizeDepth={3}
        autorender={true}
        cameraTextureHeight={1920}
        cameraTextureWidth={1080}
      />



      {/* <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        autoFocus={true}
        whiteBalance={Camera.Constants.WhiteBalance.auto}></Camera>
      <Pressable
        onPress={() => handleImageCapture()}
        style={styles.captureButton}></Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  captureButton: {
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 50,
    bottom: 40,
    width: 100,
    zIndex: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 24,
    backgroundColor: 'gray',
  },
  dismissButton: {
    width: 150,
    height: 50,
    marginTop: 60,
    borderRadius: 24,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default CameraScreen;











// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
// import { useEffect, useRef, useState } from 'react';
// import { shareAsync } from 'expo-sharing';
// import * as MediaLibrary from 'expo-media-library';
// import InformationModal from '../../components/Information';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';


// export default function CameraScreen() {
//   let cameraRef = useRef();
//   const [hasCameraPermission, setHasCameraPermission] = useState();
//   const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
//   const [photo, setPhoto] = useState();

//   useEffect(() => {
//     (async () => {
//       const cameraPermission = await Camera.requestCameraPermissionsAsync();
//       const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
//       setHasCameraPermission(cameraPermission.status === "granted");
//       setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
//     })();
//   }, []);

//   if (hasCameraPermission === undefined) {
//     return <Text>Requesting permissions...</Text>
//   } else if (!hasCameraPermission) {
//     return <Text>Permission for camera not granted. Please change this in settings.</Text>
//   }

//   let takePic = async () => {
//     let options = {
//       quality: 1,
//       base64: true,
//       exif: false
//     };

//     let newPhoto = await cameraRef.current.takePictureAsync(options);
//     setPhoto(newPhoto);
//   };

//   if (photo) {
//     let sharePic = () => {
//       shareAsync(photo.uri).then(() => {
//         setPhoto(undefined);
//       });
//     };

//     let savePhoto = () => {
//       MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
//         setPhoto(undefined);
//       });
//     };

//     return (
//       <SafeAreaView style={styles.container}>
//         <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
//         <Button title="Share" onPress={sharePic} />
//         {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
//         <Button title="Discard" onPress={() => setPhoto(undefined)} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <Camera style={styles.container} ref={cameraRef}>
//       <View style={styles.buttonContainer}>
//         <Button title="Take Pic" onPress={takePic} />
//       </View>
//       <StatusBar style="auto" />
//     </Camera>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonContainer: {
//     backgroundColor: '#fff',
//     alignSelf: 'flex-end'
//   },
//   preview: {
//     alignSelf: 'stretch',
//     flex: 1
//   }
// });