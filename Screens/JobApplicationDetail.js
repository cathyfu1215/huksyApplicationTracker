import React from 'react'
import AddRecord from './AddRecord.js';
import PressableButton from '../Components/PressableButton.js';
import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function JobApplicationDetail(props) {

    function editHandler() {
        props.navigation.replace('EditJobApplication', {data: props.route.params.data});
    }
    useEffect(() => {
        props.navigation.setOptions({
          headerRight: () => {
            return (
              <PressableButton pressedFunction={editHandler} >
                <FontAwesome name="pencil" size={20} color="black" />
              </PressableButton>
            );
          },
        });
      }, []);
      
      return(
        <AddRecord navigation={props.navigation} route={props.route} type='detail' />
        
      );
}

export default JobApplicationDetail
