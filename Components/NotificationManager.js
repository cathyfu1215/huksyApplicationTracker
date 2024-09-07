/**
 * This notification manager is used to set a notification for a todo.
 * It has a text property and a time property.
 * The text property is the content of the notification
 * The time property is the time after which the notification will be sent (in seconds)
 */
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import * as Notifications from "expo-notifications";

function NotificationManager(props) {
    const scheduleNotificationHandler = async () => {
        try {
          if (await verifyPermissions()) {
            let identifier = await Notifications.scheduleNotificationAsync({
              content: {
                title: 'Todo Notification',
                body: props.notificationContent,
              },
              trigger: {
                seconds: props.time, 
              },
            });
            console.log('notification scheduled:', identifier);
          } else {
            console.log('permissions for notification are not granted');
          }
        } catch (err) {
          console.log('error scheduling notification:', err);
        }
      };
    
      const verifyPermissions = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status !== 'granted') {
            alert('You need to enable the permission for sending notifications');
            return false;
          }
        }
        return true;
      };

      return (
        <View style={{alignItems: 'center'}}>
            <Pressable 
                style={{backgroundColor: 'lightyellow', padding: 8,margin:10, width: 100}} 
                onPress={scheduleNotificationHandler}
              >
                {props.time >= 3600 ? (
                  <Text style={{color: 'black', alignSelf: 'center'}}>
                    {Math.round(props.time / 3600)} hours 
                  </Text>
                ) : props.time >= 300 ? (
                  <Text style={{color: 'black', alignSelf: 'center'}}>
                    {Math.round(props.time / 60)} minutes 
                  </Text>
                ) : (
                  <Text style={{color: 'black', alignSelf: 'center'}}>
                    {Math.round(props.time)} seconds 
                  </Text>
                )}
             </Pressable>
        </View>
      )

}

export default NotificationManager;