import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Pressable } from 'react-native'
import { Badge } from '@rneui/themed';
import { Avatar } from '@rneui/themed';
import { Image } from 'react-native';



function EncourageSignUp(props) {

    function jumpToSignUp(){
        props.navigation.replace('Signup');
    }

  return (
    <SafeAreaView style={{ alignItems:'center', flexDirection:'column'}}>
   
        <Pressable onPress={jumpToSignUp}>
         <View style={{padding:10, margin: 10, borderWidth:2, borderColor:'grey', alignItems:'center'}}>
         <View style={{flexDirection:'column'}}>
        
        <View style={{marginTop:20, marginBottom:30}}>
         <Text style={{fontSize:20}}>Dear User,</Text>
         <Text style={{fontSize:15}}>Please sign up/log in to see the data analysis,</Text>
         <Text style={{fontSize:15}}>and have your achievement recorded!</Text>
         <Text style={{fontSize:15}}>You will win badges and start to collect fun tokens!</Text>
         </View>

         <View style={{margin:10, marginTop:20}}>
         <Image source={{uri:'https://miro.medium.com/v2/resize:fit:540/1*J_EXEmUkOcg-rgzJudUhZQ.png'}} style={{width:250,height:200}}/>
         </View>
         
         
         <View style={{margin:10, marginTop:20}}>
         <Badge textStyle={{fontWeight:'bold'}} value="Applied for 100 jobs" status="error" />
         <Badge textStyle={{fontWeight:'bold'}} value="Interviewed for 10 jobs" status="success" />
         </View>
         </View>
         
         
         <View style={{flexDirection:'row', margin:10, marginTop:20}}>
         <Avatar
            size={60}
            rounded
            source={{ uri: 'https://1000logos.net/wp-content/uploads/2016/10/Batman-Logo-2011-500x281.png' }}
            title="batman"
            containerStyle={{ backgroundColor: 'grey' }}
          ></Avatar>
           <Avatar
            size={60}
            rounded
            source={{ uri: 'https://1000logos.net/wp-content/uploads/2018/08/Hogwarts-Logo-500x281.jpg' }}
            title="wizard"
            containerStyle={{ backgroundColor: 'grey' }}
          ></Avatar>
          </View>
          </View>
          
        </Pressable>
   </SafeAreaView>
  )
}

export default EncourageSignUp;
