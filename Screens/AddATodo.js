import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import SaveButton from '../Components/SaveButton';
import CancelButton from '../Components/CancelButton';
import { auth } from '../Firebase/firebaseSetup';
import { addTodo } from '../Firebase/firebaseHelper';
import NotificationManager from '../Components/NotificationManager';


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
            <View>
            <Text style={{ margin: 5, fontWeight: 20, fontWeight: 'bold', marginTop:10 }}>Remind me in :</Text>
            <View style={{margin: 20, alignContent:'center', alignItems:'center'}}>
                
                <View style={{flexDirection:'row'}}>
                <NotificationManager notificationContent={text} time={5}/>
                <NotificationManager notificationContent={text} time={1800}/>
                
                </View>
                <View style={{flexDirection:'row'}}>
                <NotificationManager notificationContent={text} time={3600}/>
                <NotificationManager notificationContent={text} time={7200}/>
                
                </View>
                <View style={{flexDirection:'row'}}>
                <NotificationManager notificationContent={text} time={86400}/>
                <NotificationManager notificationContent={text} time={172800}/>
                </View>
            </View>
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
