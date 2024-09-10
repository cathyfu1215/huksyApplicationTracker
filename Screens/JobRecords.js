// This is the screen that shows all the job applications that the user has saved
// It is also the home screen of the app (first thing the user sees when they login or sign up)
// The user can click on a job application to see more details about it
// Whenever a job application is added or edited, the user will be redirected to this screen and see the updated list of job applications


import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import ItemsList from '../Components/ItemList.js';
import { fetchJobApplications } from '../Firebase/firebaseHelper.js';
import { auth } from '../Firebase/firebaseSetup.js';

function JobRecords(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchJobApplications(auth.currentUser.uid, setData);
    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  useEffect(() => {
    if (props.route.params?.refresh) {
      // Trigger your refresh logic here
      console.log('Refresh triggered');
    }
  }, [props.route.params?.refresh]);

  return (
    <SafeAreaView>
      <ItemsList data={data} navigation={props.navigation} route={props.route} />
    </SafeAreaView>
  );
}

export default JobRecords;
