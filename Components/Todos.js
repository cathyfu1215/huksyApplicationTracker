import React, { useState, useCallback } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TodoList from './TodoList';
import { fetchTodos } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';



function Todos(props) {
  const [todos, setTodos] = useState([]);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const data = await fetchTodos(auth.currentUser.uid, props.jobApplicationRecordId);
      return data;
    } catch (error) {
      console.error("Error fetching todos: ", error);
      return [];
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        const data = await getData();
        if (isActive && data && data.length > 0) {
          setTodos(data);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [props.jobApplicationRecordId])
  );

  const handleAddTodo = () => {
    navigation.navigate('AddATodo', { jobApplicationRecordId: props.jobApplicationRecordId });
  };

  return (
    <ScrollView style={{ flex:1 ,margin: 10, borderColor: 'black', borderWidth: 1,minHeight:'25%',padding:5}}>
      <Text style={{fontWeight:'bold',fontSize:20}}>Todos</Text>
      <Text style={{fontSize:12}}>You can browse/delete Todos in the detail page, and add Todos in the edit page.</Text>
      <Text style={{fontSize:12}}>You can add a notification for each Todo.</Text>
    <View style={{marginTop:10, marginBottom:10}}>
      <TodoList data={todos} jobApplicationRecordId={props.jobApplicationRecordId} />
      <Button title='Add a Todo' style={{ backgroundColor: 'lightblue', margin: 10, borderRadius: 10, marginBottom: 20,}} onPress={handleAddTodo} disabled={props.type === 'detail'} />
    </View>
    </ScrollView>
  );
}

export default Todos;
