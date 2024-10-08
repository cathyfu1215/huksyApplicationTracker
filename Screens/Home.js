// This is the home screen that is in charge of the bottom navigation bar.
// The default screen is the JobRecords screen, but the user can navigate to the AddRecord, Achievements, and Setting screens.
// I also included a gradient background for the app in this file.

import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobRecords from './JobRecords';
import Achievements from './Achievements';
import Setting from './Setting';
import MyTabButton from '../Components/MyTabButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import AddRecord from './AddRecord';
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();

const GradientScreen = ({ children }) => (
  <LinearGradient
    colors={['#5cc6a0', '#FFFFFF']}
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

function Home({route }) {
  return (
    <Tab.Navigator initialRouteName={route.params?.screen || 'JobRecords'}>
      <Tab.Screen
        name="JobRecords"
        component={GradientWrapper(JobRecords)}
        options={({ navigation, route }) => ({
          tabBarButton: (props) => <MyTabButton {...props} navigation={navigation} name="JobRecords" logo={<FontAwesome name="list-ul" size={24} color="black" />} />,
        })}
      />
      <Tab.Screen
        name="AddRecord"
        component={GradientWrapper(AddRecord)}
        options={({ navigation, route }) => ({
          tabBarButton: (props) => <MyTabButton {...props} navigation={navigation}
          name="AddRecord"
          logo={<Entypo name="circle-with-plus" size={24} color="black" />}
        />,
        })}
      />
      <Tab.Screen
        name="Achievements"
        component={GradientWrapper(Achievements)}
        options={({ navigation, route }) => ({
          tabBarButton: (props) => <MyTabButton {...props} navigation={navigation} name="Achievements" logo={<FontAwesome6 name="award" size={24} color="black" />} />,
        })}
      />
      <Tab.Screen
        name="Setting"
        component={GradientWrapper(Setting)}
        options={({ navigation, route }) => ({
          tabBarButton: (props) => <MyTabButton {...props} navigation={navigation} name="Setting" logo={<Ionicons name="settings" size={24} color="black" />} />,
        })}
      />
    </Tab.Navigator>
  );
}

export default Home;
