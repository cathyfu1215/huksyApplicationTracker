import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import ItemsList from '../Components/ItemList.js';
import { fetchJobApplications } from '../Firebase/firebaseHelper.js';
import { auth } from '../Firebase/firebaseSetup.js';

function JobRecords(props) {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const jobApplications = await fetchJobApplications(auth.currentUser.uid);
      setData(jobApplications);
    } catch (error) {
      console.error("Error fetching job records: ", error);
    }
  };

  useEffect(() => {
    getData();
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
