import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import PressableButton  from './PressableButton';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'react-native';
import { useState } from 'react';



function ImageManager({modifyImageURI,chooseNoImage}) {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageURI, setImageURI] = useState(null);
    const [noImage, setNoImage] = useState(false);


    const handleChooseNoImage = () => {
        setNoImage(true);
        chooseNoImage();
    }
  
    const vefifyPermissions = async() => {
        if(status.granted === true) {
            return true;
        }
        else{
            const permission = await requestPermission();
            console.log('image permission',permission);
            return permission.granted;
            
        }
       
    }

    const takeImageHandler = async () => {
       

        try {
            if(vefifyPermissions()){
            const result = await ImagePicker.launchCameraAsync(
                {
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                  }
            );
            //console.log('result from camera',result);
            if (!result.canceled) {
               // console.log('photo uri',result.assets[0].uri);
                setImageURI(result.assets[0].uri);
                // pass it to AddANote.js
                modifyImageURI(result.assets[0].uri);
            }
        }
        else{
            alert('Permission to access camera was denied');
        }
        }
        
        catch (err) {
            console.log(err);
            alert('An error occurred when taking image', err.message, [{ text: 'Okay' }]);
        }
      };
    
  return (
    <View style={{alignItems:'center'}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <PressableButton pressedFunction={takeImageHandler}>
        <Feather name="camera" size={24} color="black" />
        </PressableButton>
        <View style={{marginLeft:20}}>
        <PressableButton pressedFunction={handleChooseNoImage}>
            <Text>No Image for this note</Text>
        </PressableButton>
        </View>
        </View>
        {imageURI&&<Text>Preview:</Text>}
        {noImage&&<Text>No Image for this note</Text>}
        
        <Image style={{height:150,width:150,margin:20}}source={{uri: imageURI}}/>
    </View>
  )
}

export default ImageManager