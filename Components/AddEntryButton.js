import React from 'react'
import { View, Text, Pressable } from 'react-native';




/* This button is for either add an entry to activity or diet */

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