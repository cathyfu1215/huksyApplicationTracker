
// This is very similer to the noteList File.
// We have a todoLine item that displays the text of a todo and whether it is checked or not.
// We then map over the data array and render a TodoLine component for each todo.


import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { deleteTodo, updateTodo } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';
import Feather from '@expo/vector-icons/Feather';

function TodoList({ data, jobApplicationRecordId }) {
  const navigation = useNavigation();

  function TodoLine({ item }) {
    const [checked, setChecked] = useState(item.checked);

    useEffect(() => {
      setChecked(item.checked);
    }, [item.checked]);

    const handleDeleteTodo = () => {
      Alert.alert(
        'Warning',
        'Are you sure you want to delete this todo?',
        [
          { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'YES', onPress: () => {
              deleteTodo(auth.currentUser.uid, jobApplicationRecordId, item.id);
              console.log('Todo with id:', item.id, 'deleted');
              navigation.popToTop();
            }
          },
        ]
      );
    };

    const handleToggleCheck = async () => {
      const newCheckedStatus = !checked;
      setChecked(newCheckedStatus);
      await updateTodo(
        auth.currentUser.uid,
        jobApplicationRecordId,
        item.id,
        newCheckedStatus
      );
    };

    return (
      <View style={styles.itemContainer}>
        <View style={styles.todoLineContainer}>
          <CheckBox
            checked={checked}
            onPress={handleToggleCheck}
          />
          <Text style={styles.todoText}>{item.text}</Text>
          <Pressable style={styles.deleteButton} onPress={handleDeleteTodo}>
            <Feather name="trash-2" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {data.map(item => (
        <TodoLine key={item.id} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoText: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    flexWrap: 'wrap',
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default TodoList;
