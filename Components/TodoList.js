import React from 'react';
import { Text, ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { deleteTodo } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

function TodoList({ data, jobApplicationRecordId }) {
  const navigation = useNavigation();

  function TodoLine({ item }) {
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
    }

    return (
      <View style={styles.itemContainer}>
        <View style={styles.todoLineContainer}>
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
