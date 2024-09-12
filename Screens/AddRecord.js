// This file is reused from different screens:
// 1. Add a job application record
// 2. Display a job application record (contents are read only, except for deleting notes and todos)
// 3. Edit a job application record (everything is editable)



import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SaveButton from '../Components/SaveButton';
import CancelButton from '../Components/CancelButton';
import { addJobApplication, updateJobApplication, updateUser } from '../Firebase/firebaseHelper';
import styleHelper from '../styleHelper';
import { Rating } from 'react-native-ratings';
import styles from '../styleHelper';
import { auth } from '../Firebase/firebaseSetup'; 
import Notes from '../Components/Notes';
import Todos from '../Components/Todos';
import {increment } from 'firebase/firestore'; 

const AddRecord = ({ navigation, route, type }) => {

  // I used these states to tell what mode the user is in
  // This decides how to render the screen
  // For example, if the user is in the 'edit' mode, we will render the screen with all fields editable
  // If the user is in the 'detail' mode, we will render the screen with all fields read only, except for deleting notes and todos
  // If the user is in the 'add' mode, we will only render the the mandatory fields


  const itemEditable = ((!type) || type === 'edit') ? true : false;
  const isEditMode = type && (type === 'edit');
  const isDetailMode = type && (type === 'detail');


  // below are the mandatory fields

  const [companyName, setCompanyName] = useState(route.params ? route.params.data.companyName : "");
  const [positionName, setPositionName] = useState(route.params ? route.params.data.positionName : "");
  const [preferenceScore, setPreferenceScore] = useState(route.params ? Number(route.params.data.preferenceScore) : 5);
  const [status, setStatus] = useState(route.params ? route.params.data.status : "In Progress");
  const [date, setDate] = useState(route.params ? route.params.data.date.toDate() : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // below are the enum values for the status
  const items = [
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Applied', value: 'Applied' },
    { label: 'Interviewing', value: 'Interviewing' },
    { label: 'Interviewed', value: 'Interviewed' },
    { label: 'Offer', value: 'Offer' },
    { label: 'Offer Accepted', value: 'Offer Accepted' },
    { label: 'Rejected', value: 'Rejected' }
  ];

  // this marks if the user has rated their preference of the job application, from 1 to 10
  function ratingCompleted(rating) {
    setPreferenceScore(rating);
  }


  // when the status of a job changes, we need to update the user's status in the backend
  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    const uid = auth.currentUser.uid;
    let updatedData = {};

    // the implementation here is quite naive
    // because we are not checking the previous status
    // we reply on the user to update the status correctly and step by step
    // for example: if the user is in the 'In Progress' status, they can only move to 'Applied' status
    // if the user is in the 'Applied' status, they can only move to 'Interviewed' status
    // otherwise, the count in the achievement page will be inaccurate

    switch (newStatus) {
      case 'In Progress':
        updatedData = { numJobsSaved: increment(1) };
        break;
      case 'Applied':
        updatedData = { numJobsApplied: increment(1) };
        break;
      case 'Interviewed':
        updatedData = { numJobsInterviewed: increment(1) };
        break;
      case 'Offer':
        updatedData = { numJobsOffered: increment(1) };
        break;
      case 'Rejected':
        updatedData = { numJobsRejected: increment(1) };
        break;
      default:
        break;
    }

    try {
      await updateUser(uid, updatedData);
    } catch (error) {
      console.error("Error updating user status: ", error);
    }
  };

  const handleSave = async () => {
    // we need all the mandatory fields to be filled in
    if (companyName && positionName && preferenceScore && status && date) {
     
      try {
        await handleStatusChange(status); // update user status no matter it is adding or editing
        if (isEditMode) {
          await updateJobApplication(auth.currentUser.uid, route.params.data.id, companyName, positionName, preferenceScore, status, date);
        } else {
          await addJobApplication(auth.currentUser.uid, companyName, positionName, preferenceScore, status, date);
        }
        Alert.alert('Success', 'Record saved successfully');
        navigation.navigate('Home', { refresh: true,screen: 'JobRecords'});
      } catch (error) {
        console.error("Error adding/editing document: ", error);
      }
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  return (
    <View style={{flex:1}}>
    <ScrollView style={{flex:1}} contentContainerStyle={{ flexGrow: 1, paddingBottom: 350, margin: 10 }} bounces={false}>
      <View style={styles.container}>
        <Text style={styles.addEntryText}>Company *</Text>
        <TextInput
          style={styleHelper.textInput}
          placeholder="Enter company name"
          value={companyName}
          onChangeText={setCompanyName}
          editable={itemEditable}
        />

        <Text style={styles.addEntryText}>Position *</Text>
        <TextInput
          style={styleHelper.textInput}
          placeholder="Enter position name"
          value={positionName}
          onChangeText={setPositionName}
          editable={itemEditable}
        />

        <Text style={styles.addEntryText}>Preference Score *</Text>
        <Rating
          type='heart'
          ratingCount={10}
          imageSize={30}
          showRating
          onFinishRating={ratingCompleted}
          readonly={!itemEditable}
          startingValue={preferenceScore}
        />

        <View style={{marginTop:10,marginBottom:20}}>
        <Text style={styles.addEntryText}>Application Status *</Text>
        <View style={{ margin: 5}}>
          {items.map((item) => (
            <View key={item.value} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
                onPress={() => setStatus(item.value)}
                disabled={!itemEditable}
              >
                {status === item.value && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: '#000',
                    }}
                  />
                )}
              </TouchableOpacity>
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
        </View>

        <Text style={styles.addEntryText}>Date of Last Update *</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styleHelper.textInput}>
          <Text style={styles.dateText}>
            {date ? date.toDateString() : ''}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (event.type !== 'dismissed') {
                setDate(selectedDate);
              }
            }}
            disabled={!itemEditable}
          />
        )}

        {/* we only display the notes and todos in the 'edit' and 'detail' mode */}
        {isEditMode && <Notes type='edit' jobApplicationRecordId={route.params.data.id} />}
        {isDetailMode && <Notes type='detail' jobApplicationRecordId={route.params.data.id} />}
        {isEditMode && <Todos type='edit' jobApplicationRecordId={route.params.data.id} />}
        {isDetailMode && <Todos type='detail' jobApplicationRecordId={route.params.data.id} />}


        {/* we don't display the save button or the cancel button in the 'detail' mode */}
        {itemEditable && <View style={styleHelper.saveCancelContainer}>
          <SaveButton onPress={handleSave} />
          <CancelButton onPress={() => navigation.goBack()} />
        </View>}

        <Text style={{paddingBottom:20}}>This is the end of our functionalities, expect more in the future!</Text>
      </View>
    </ScrollView>
    </View>
  );
};

export default AddRecord;
