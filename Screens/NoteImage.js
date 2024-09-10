// This is a simple full screen page to display the image that the user has uploaded.


import React from 'react'
import { View,Text,Image,Dimensions  } from 'react-native'
import { SafeAreaView } from 'react-native';

function NoteImage(props) {
    const { width, height } = Dimensions.get('window');
  return (
    <SafeAreaView>
        <View style={{alignContent:'center', alignItems:'center',margin:10}}>
        <Image source={{ uri: props.route.params.imageURL }} style={{ width: width*0.8, height: height*0.8 }} />
        </View>
    </SafeAreaView>
  )
}

export default NoteImage
