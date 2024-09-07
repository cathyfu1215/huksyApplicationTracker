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
  const itemEditable = ((!type) || type === 'edit') ? true : false;
  const isEditMode = type && (type === 'edit');
  const isDetailMode = type && (type === 'detail');

  const [companyName, setCompanyName] = useState(route.params ? route.params.data.companyName : "");
  const [positionName, setPositionName] = useState(route.params ? route.params.data.positionName : "");
  const [preferenceScore, setPreferenceScore] = useState(route.params ? Number(route.params.data.preferenceScore) : 5);
  const [status, setStatus] = useState(route.params ? route.params.data.status : "In Progress");
  const [date, setDate] = useState(route.params ? route.params.data.date.toDate() : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const items = [
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Applied', value: 'Applied' },
    { label: 'Interviewing', value: 'Interviewing' },
    { label: 'Interviewed', value: 'Interviewed' },
    { label: 'Offer', value: 'Offer' },
    { label: 'Offer Accepted', value: 'Offer Accepted' },
    { label: 'Rejected', value: 'Rejected' }
  ];

  function ratingCompleted(rating) {
    setPreferenceScore(rating);
  }

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
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 350, margin: 10 }} bounces={false}>
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

        {isEditMode && <Notes type='edit' jobApplicationRecordId={route.params.data.id} />}
        {isDetailMode && <Notes type='detail' jobApplicationRecordId={route.params.data.id} />}
        {isEditMode && <Todos type='edit' jobApplicationRecordId={route.params.data.id} />}
        {isDetailMode && <Todos type='detail' jobApplicationRecordId={route.params.data.id} />}

        {itemEditable && <View style={styleHelper.saveCancelContainer}>
          <SaveButton onPress={handleSave} />
          <CancelButton onPress={() => navigation.goBack()} />
        </View>}

        <Text style={{paddingBottom:20}}>This is the end of our functionalities, expect more in the future!</Text>
      </View>
    </ScrollView>
  );
};

export default AddRecord;
