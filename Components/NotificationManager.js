/**
 * This notification manager is used to set a notification for a todo 1h later.
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
                // seconds: 5, // for testing
                seconds: 3600, // 1 hour
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
            <Pressable style={{backgroundColor:'lightyellow',padding:10,margin:10, width: 200}} onPress={scheduleNotificationHandler}>
                <Text style={{color:'black',alignSelf:'center'}}>1h Reminder</Text>
            </Pressable>
        </View>
      )

}

export default NotificationManager;