import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditJobApplication from './Screens/EditJobApplication';
import AddRecord from './Screens/AddRecord';
import JobRecords from './Screens/JobRecords';
import Home from './Screens/Home';
import React, { useEffect, useState, useRef } from 'react';
import JobApplicationDetail from './Screens/JobApplicationDetail';
import Login from './Components/Login';
import Signup from './Components/Signup';
import styles from './styleHelper';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup'; 
import AddANote from './Screens/AddANote';
import AddATodo from './Screens/AddATodo';
import ForgetPassword from './Components/ForgetPassword';
import NoteImage from './Screens/NoteImage';

import EncourageSignUp from './Screens/EncourageSignUp';

import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const GradientScreen = ({ children }) => (
  <LinearGradient
    colors={['#FFFFFF', '#5cc6a0']}
    style={{ flex: 1 }}
  >
    <View style={{ flex: 1 }}>
      {children}
    </View>
  </LinearGradient>
);

const GradientWrapper = (Component) => (props) => (
  <GradientScreen>
    <Component {...props} />
  </GradientScreen>
);

export default function App() {
  const [user, setUser] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const AuthStack = (
    <>
      <Stack.Screen name="EncourageSignUp" component={GradientWrapper(EncourageSignUp)} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={GradientWrapper(Login)} />
      <Stack.Screen name="Signup" component={GradientWrapper(Signup)} />
      <Stack.Screen name="ForgetPassword" component={GradientWrapper(ForgetPassword)}  />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen name="Home" component={GradientWrapper(Home)} options={{ headerShown: false }} />
      <Stack.Screen name="AddRecord" component={GradientWrapper(AddRecord)} />
      <Stack.Screen name="JobApplicationDetail" component={GradientWrapper(JobApplicationDetail)} />
      <Stack.Screen name="EditJobApplication" component={GradientWrapper(EditJobApplication)} />
      <Stack.Screen name="JobRecords" component={GradientWrapper(JobRecords)} />
      <Stack.Screen name="AddANote" component={GradientWrapper(AddANote)} />
      <Stack.Screen name="AddATodo" component={GradientWrapper(AddATodo)} />
      <Stack.Screen name="NoteImage" component={GradientWrapper(NoteImage)} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      >
        {(user !== null) ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
