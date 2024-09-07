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
         <Text style={{fontSize:15, marginTop:10}}>Please sign up to see the data analysis, collect</Text>
         <Text style={{fontSize:15, marginTop:10}}>badges and have your achievement recorded!</Text>
         </View>

         <View style={{margin:10, marginTop:20}}>
         <Image source={{uri:'https://miro.medium.com/v2/resize:fit:540/1*J_EXEmUkOcg-rgzJudUhZQ.png'}} style={{width:250,height:200}}/>
         </View>
         
         
         <View style={{margin:10, marginTop:20}}>
          {/* The status here just indicate the color of the badges */}
         <Badge textStyle={{fontWeight:'bold'}} value="Applied for 100 jobs" status="error" />
         <Badge textStyle={{fontWeight:'bold'}} value="Interviewed for 10 jobs" status="success" />
         <Badge textStyle={{fontWeight:'bold'}} value="Got 10 Offers" status="warning" />
         <Badge textStyle={{fontWeight:'bold'}} value="100 days using this app" status="primary" />
         </View>
         </View>
         
         
         <View style={{flexDirection:'row', margin:10, marginTop:20}}>
          </View>
          </View>
          
        </Pressable>
   </SafeAreaView>
  )
}

export default EncourageSignUp;
