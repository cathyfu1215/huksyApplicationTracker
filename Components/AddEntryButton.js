// This is a reusable component that is a button
// It has a text that is passed as a prop
// When pressed, it navigates to the screen that is passed as a prop, and it will give a visual feedback to the user

import React from 'react'
import { View, Text, Pressable } from 'react-native';




function AddEntryButton(props) {
  function handleAddEntry(){
 
    props.navigation.navigate(props.type);
  }


  return (
    <View>
        <Pressable onPress={handleAddEntry} style={({ pressed }) => [
      { backgroundColor: pressed ? 'yellow' : null , marginBottom:10, marginRight:15}]
    }
    android_ripple={{color: 'yellow'}}>
          <Text>{props.name}</Text>
        </Pressable>

    </View>
  )
}

export default AddEntryButton