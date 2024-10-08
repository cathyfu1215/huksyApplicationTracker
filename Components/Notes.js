// The notes component, which displays list of notes for a job application record.
// It contains a button to add notes.
// It will be refreshed when a new note is added.
// It contains a bug that when we add a new note, it became extremely long and the add note button is not visible.
// (This bug happens occasionally, and I am working on fixing it.)


import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NoteList from './NoteList';
import { fetchNotes } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';
import PressableButton from './PressableButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

function Notes(props) {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = fetchNotes(auth.currentUser.uid, props.jobApplicationRecordId, setNotes);
    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [props.jobApplicationRecordId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotes(auth.currentUser.uid, props.jobApplicationRecordId, setNotes);
    });
    return unsubscribe;
  }, [navigation]);


  const handleAddNote = () => {
    navigation.navigate('AddANote', { jobApplicationRecordId: props.jobApplicationRecordId });
  };

  return (
    <ScrollView style={{ margin: 10, borderColor: 'black', borderWidth: 1, minHeight: 100,maxHeight:300, padding: 5 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Notes</Text>
      <Text style={{ fontSize: 12, marginVertical: 5 }}>• You can browse/delete notes in the detail page, and add notes in the edit page.</Text>
      <Text style={{ fontSize: 12, marginVertical: 5 }}>• Notes with no image added will have a default image.</Text>
      <Text style={{ fontSize: 12, marginVertical: 5 }}>• Click the image in a note to see it in full screen.</Text>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <NoteList data={notes} jobApplicationRecordId={props.jobApplicationRecordId} />
        <PressableButton pressedFunction={handleAddNote} disabled={props.type === 'detail'}>
          <Entypo name="plus" size={24} color="black" />
          <FontAwesome name="pencil-square-o" size={24} color="black" />
        </PressableButton>
      </View>
    </ScrollView>
  );
}

export default Notes;
