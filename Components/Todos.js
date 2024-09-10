// the todo list component that displays the list of todos for a job application record.
// Its logic is very similar to the notes component.


import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TodoList from './TodoList';
import { fetchTodos } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';
import  PressableButton  from './PressableButton';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



function Todos(props) {
  const [todos, setTodos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = fetchTodos(auth.currentUser.uid, props.jobApplicationRecordId, setTodos);
    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [props.jobApplicationRecordId]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchTodos(auth.currentUser.uid, props.jobApplicationRecordId, setTodos);
      });
      return unsubscribe;
    }, [navigation])
  );
  
  const handleAddTodo = () => {
    navigation.navigate('AddATodo', { jobApplicationRecordId: props.jobApplicationRecordId });
  };

  return (
    <ScrollView style={{ flex:1 ,margin: 10, borderColor: 'black', borderWidth: 1,minHeight:'25%',padding:5}}>
      <Text style={{fontWeight:'bold',fontSize:20}}>Todos</Text>
      <Text style={{fontSize:12, marginVertical:5 }}>• You can browse/delete Todos in the detail page, and add Todos in the edit page.</Text>
      <Text style={{fontSize:12, marginVertical:5 }}>• You can toggle the status of a todo in this detail page.</Text>
      <Text style={{fontSize:12, marginVertical:5}}>• You can add a notification for each Todo.</Text>
    <View style={{marginTop:10, marginBottom:10}}>
      <TodoList data={todos} jobApplicationRecordId={props.jobApplicationRecordId} />
      <PressableButton pressedFunction={handleAddTodo} disabled={props.type === 'detail'}>
      <Entypo name="plus" size={24} color="black" />
      <FontAwesome6 name="list-check" size={24} color="black" />
      </PressableButton>
    </View>
    </ScrollView>
  );
}

export default Todos;
