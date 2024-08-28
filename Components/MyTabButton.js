import React from 'react'
import { View,Text } from 'react-native'
import styles from '../styleHelper.js'
import { Pressable} from 'react-native'


function MyTabButton(props) {
  //console.log('props received by tab button are:', props);
  return (
    <Pressable onPress={()=>props.navigation.navigate(props.name)
    } style={({ pressed }) => [
      { backgroundColor: pressed ? 'yellow' : null }]
    }
    android_ripple={{color: 'yellow'}}
    >
      <View style={styles.tabButtonContainer}>
          <View>{props.logo}</View>
          <View><Text>{props.name}</Text></View>
      </View>
    </Pressable>
  )
}

export default MyTabButton