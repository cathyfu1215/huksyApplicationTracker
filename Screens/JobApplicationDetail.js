import React from 'react'
import { View, Text, Pressable } from 'react-native'
import AddAJobApplication from './AddAJobApplication.js';
import styles from '../styleHelper.js';
import PressableButton from '../Components/PressableButton.js';
import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function JobApplicationDetail(props) {
  //console.log('route.params in jobapplicationdetail', props.route.params);

    function editHandler() {
        props.navigation.navigate('EditJobApplication', {data: props.route.params.data});
    }
    useEffect(() => {
        props.navigation.setOptions({
          headerRight: () => {
            return (
              <PressableButton pressedFunction={editHandler} >
                <FontAwesome name="pencil" size={24} color="black" />
              </PressableButton>
            );
          },
        });
      }, []);
      
      return(
        <AddAJobApplication navigation={props.navigation} route={props.route} type='detail' />
        
      );
}

export default JobApplicationDetail
