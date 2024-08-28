/**
 * This notification manager is used to set a test notification(10s).
 */
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import * as Notifications from "expo-notifications";

function NotificationManagerTest(props) {
    const scheduleNotificationHandler = async () => {
        try {
          if (await verifyPermissions()) {
            let identifier = await Notifications.scheduleNotificationAsync({
              content: {
                title: 'Todo Notification',
                body: props.notificationContent,
              },
              trigger: {
                // This reminder is for the convenience of testing  
                seconds: 10,         
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
            <Pressable style={{backgroundColor:'white',padding:10,margin:10, width:200,}} onPress={scheduleNotificationHandler}>
                <Text style={{color:'black',alignSelf:'center'}}>10s for Testing</Text>
            </Pressable>
        </View>
      )

}

export default NotificationManagerTest;