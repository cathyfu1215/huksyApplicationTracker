import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobRecords from './JobRecords';
import Achievements from './Achievements';
import Setting from './Setting';
import MyTabButton from '../Components/MyTabButton';
import AddEntryButton from '../Components/AddEntryButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

const GradientScreen = ({ children }) => (
  <LinearGradient
    colors={['#B0C4DE', '#FFFFFF']}
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

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="JobRecords"
        component={GradientWrapper(JobRecords)}
        options={({ navigation, route }) => ({
          tabBarButton: (props) => <MyTabButton {...props} navigation={navigation} name="JobRecords" logo={<FontAwesome name="list-ul" size={24} color="black" />} />,
          headerRight: () => (
            <AddEntryButton
              type="AddAJobApplication"
              name={
                <View style={styles.addEntryView}>
                  <Feather name="plus" size={24} color="black" />
                  <FontAwesome name="list-ul" size={24} color="black" />
                </View>
              }
              navigation={navigation}
              route={route}
            />
          ),
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
