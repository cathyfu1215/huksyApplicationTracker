import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import SaveButton from '../Components/SaveButton';
import CancelButton from '../Components/CancelButton';
import { auth } from '../Firebase/firebaseSetup';
import { addTodo } from '../Firebase/firebaseHelper';
// Notification Manger for the 1h reminder
import NotificationManager from '../Components/NotificationManager';
// Notification Manger for the 2h reminder
import NotificationManager1 from '../Components/NotificationManager1';
// Notification Manger for the 24h reminder
import NotificationManager2 from '../Components/NotificationManager2';
// Notification Manger for testing
import NotificationManagerTest from '../Components/NotificationManagerTest';

function AddATodo(props) {
    const [text, setText] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveTodo = () => {
        if (text.trim() === '') {
            Alert.alert('Please enter the text of the todo');
            return;
        }
        setIsSaving(true);
            addTodo(auth.currentUser.uid, props.route.params.jobApplicationRecordId, text)
                .then(() => {
                    console.log('Todo added');
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.error("Error adding todo: ", error);
                })
                .finally(() => {
                    setIsSaving(false);
                });
    };

    const handleCancelTodo = () => {
        props.navigation.goBack();
    };

    return (
        <View style={{ flex: 1, alignItems: 'stretch' }}>
            <Text style={{ margin: 5, fontWeight: 20, fontWeight: 'bold' }}>Text of the Todo:</Text>
            <TextInput
                style={{ minHeight: '10%', borderColor: 'grey', borderRadius: 10, borderWidth: 2, margin: 5, padding: 10 }}
                value={text}
                onChangeText={setText}
            />
            <View style={{margin: 20}}>
                <NotificationManagerTest notificationContent={text}/>
                <NotificationManager notificationContent={text}/>
                <NotificationManager1 notificationContent={text}/>
                <NotificationManager2 notificationContent={text}/>
            </View>
            {isSaving && (
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ marginTop: 10 }}>Please wait, processing your data...</Text>
                </View>
            )}
            <View style={{ flexDirection: 'row' }}>
                <SaveButton onPress={handleSaveTodo} disabled={isSaving} />
                <CancelButton onPress={handleCancelTodo} />
            </View>
        </View>
    );
}

export default AddATodo;
