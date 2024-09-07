import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Avatar, Badge } from '@rneui/themed';
import { auth } from '../Firebase/firebaseSetup'; 
import { fetchUser } from '../Firebase/firebaseHelper';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

function Achievements() {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const user = await fetchUser(auth.currentUser.uid); // Call fetchUser
      setUser(user);
    } catch (error) {
      console.error("Error fetching current user: ", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // if this is a newly created account or this is a demo account, we use example data
  //otherwise, we use the data from the database
  const allDataIsZero = user.numJobsSaved === 0 && user.numJobsApplied === 0 && user.numJobsInterviewed === 0 && user.numJobsOffered === 0 && user.numJobsRejected === 0;

  // pending means we have applied for the job but haven't heard back
  // interview means we have at least one interview with the company, but there is no decision yet
  // offer means we have received an offer from the company
  // rejection means we have been rejected by the company
  // if we add them up, it should be the total number of jobs we have applied for

 
  const data = [
    { name: 'Pending', population: allDataIsZero ? 100 : (user.numJobsApplied - user.numJobsInterviewed) || 0, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Interview', population: allDataIsZero ? 20 : user.numJobsInterviewed - user.numJobsOffered - user.numJobsRejected || 0, color: '#FFFF00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Offer', population: allDataIsZero ? 5 : user.numJobsOffered || 0, color: 'rgb(0, 255, 0)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Rejection', population: allDataIsZero ? 15 : user.numJobsRejected || 0, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 3, marginTop: 20, marginRight: 10, marginLeft: 20 }}>
              <Avatar
                size={130}
                rounded
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2022/02/Northeastern-Huskies-logo.png' }}
                title="husky"
                containerStyle={{ backgroundColor: 'grey' }}
              />
            </View>
            <View style={{ flex: 2, flexDirection: 'column', marginTop: 20, marginLeft: -50 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{auth.currentUser.displayName || 'default name'}</Text>
              <Text style={{ fontSize: 15 }}>{auth.currentUser.email}</Text>
            </View>
          </View>

          <View style={{ borderWidth: 2, borderColor: 'grey', margin: 20, padding: 10, width: '90%', flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, margin: 5 }}>User Statistics</Text>
            <Text>Number of Jobs Applied: {user.numJobsApplied || 0}</Text>
            <Text>Number of Jobs Interviewed: {user.numJobsInterviewed || 0}</Text>
            <Text>Number of Jobs Offered: {user.numJobsOffered || 0}</Text>
            <Text>Number of Jobs Rejected: {user.numJobsRejected || 0}</Text>
          </View>

           {/* Display the pie chart */}
           <Text style={{margin:10}}>*If you haven't applied any jobs, we will display a sample chart.</Text>
           <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          <View style={{ borderWidth: 2, borderColor: 'grey', margin: 20, padding: 10, width: '90%', flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, margin: 5 }}>Badges</Text>
            <Text style={{ fontSize: 12, marginTop: 5, marginBottom:5 }}>*The logic of badges will be inplemented later.</Text>
            <View>
              <Badge textStyle={{ fontWeight: 'bold' }} value="Prime User" status="success" />
              <Badge textStyle={{ fontWeight: 'bold' }} value="Applied for 100 jobs" status="error" />
              <Badge textStyle={{ fontWeight: 'bold' }} value="Interviewed for 50 jobs" status="success" />
              <Badge textStyle={{ fontWeight: 'bold' }} value="Been using this app for 100 days" status="primary" />
              <Badge textStyle={{ fontWeight: 'bold' }} value="Super Administrator" status="warning" />
            </View>
          </View>

         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Achievements;
