import React, { useEffect, useState } from 'react';
import { Text, FlatList, SafeAreaView, View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styleHelper';
import PressableListItem from './PressableListItem';
import PressableButton from './PressableButton';

function ItemsList({ data, navigation }) {
  const [sortedData, setSortedData] = useState(data);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  function ItemLine({ item }) {
    function handlePressItemDetail() {
      navigation.navigate('JobApplicationDetail', { data: item });
    }
    return (
      <View style={styles.itemContainer}>
        <PressableListItem pressedFunction={handlePressItemDetail}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 15 }}>{item.companyName}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 13 }}>{item.positionName}</Text>
              <Text style={{ fontStyle: 'italic' }}>{item.status}</Text>
              <Text style={styles.itemText}>Last Update: {item.date.toDate().toDateString()}</Text>
            </View>
            <View style={{ alignItems: 'center', marginLeft: 10 }}>
              <Text style={styles.itemText}>Preference Score: </Text>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item.preferenceScore}</Text>
            </View>
          </View>
        </PressableListItem>
      </View>
    );
  }

  function sortByLastUpdate() {
    const sorted = [...data].sort((a, b) => b.date.toDate() - a.date.toDate());
    setSortedData(sorted);
  }

  function sortByPreferenceScore() {
    const sorted = [...data].sort((a, b) => b.preferenceScore - a.preferenceScore);
    setSortedData(sorted);
  }

  function filterData(text) {
    setSearchText(text);
    const filtered = data.filter(item =>
      item.companyName.toLowerCase().includes(text.toLowerCase()) ||
      item.positionName.toLowerCase().includes(text.toLowerCase())
    );
    setSortedData(filtered);
  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by company or position"
          value={searchText}
          onChangeText={filterData}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent:'space-evenly' }}>
        <PressableButton pressedFunction={sortByLastUpdate}>
          <Text>Sort by Last Update</Text>
        </PressableButton>
        <PressableButton pressedFunction={sortByPreferenceScore}>
          <Text>Sort by Preference Score</Text>
        </PressableButton>
      </View>
      <FlatList
        data={sortedData}
        renderItem={({ item }) => <ItemLine item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          <View style={{ marginBottom: 100, marginTop: 20, margin: 10 }}>
            <Text>This is the end of the job application records. Apply more!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

export default ItemsList;
