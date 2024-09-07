import { StyleSheet } from 'react-native';

//color palettes: https://www.color-hex.com/color-palette/83785

export default styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
      backgroundColor: '#afe689',
      borderRadius: 5,
      alignItems: 'center',
      alignSelf: 'center',
      margin:7,
      padding:7,
      marginRight:10,
      
    },
    buttonText:{
      color: 'white',
      fontWeight: 'bold',
    },
    tabButtonContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginLeft:10,
      marginRight:10,
      marginTop:5,
      marginBottom:5,
    },
    addEntryView: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    itemlistline: {
      flexDirection: 'row',
      padding: 10,
      margin: 10,
      backgroundColor: '#f5deb3', // Parchment-like color
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#8B4513', // Slightly darker border color
      fontWeight: 'bold',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontFamily: 'serif', // Serif font for a more classic look
  },
  

    /* light and dark theme */
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'start',
    },
    itemContainerDark: {
      flex: 1,
      backgroundColor: 'darkgrey',
      alignItems: 'center',
      justifyContent: 'start',
    },
    addEntryContainer: {
      flex: 1,
      alignItems: 'left',
      justifyContent: 'start',
      
      alignContent: 'center',
      justifyContent: 'start',
    },
    addEntryContainerDark: {
      flex: 1,
      alignItems: 'left',
      justifyContent: 'start',
     
      alignContent: 'center',
      justifyContent: 'start',
      backgroundColor: 'darkgrey',
    },


    /* end of light and dark theme */


    addEntryText:{
      fontSize: 15,
      color: 'black',
      margin: 10,
    },
    textInput:{
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
      margin: 5,
      borderRadius: 10,
      justifyContent: 'space-between',
      width:'97%',
      padding:5,
    },
    saveCancelContainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 10,
      width: '100%',
      marginBottom: 100,
      flex: 1,
    },
    saveButton:{
      backgroundColor: 'lightgreen',
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
      margin:35,
      padding:7,
      width: '27%',
      
    },
    cancelButton:{
      backgroundColor: 'pink',
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
      margin:35,
      padding:7,
      width: '27%',
    },
    cancelButtonText:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    textInputBig:{
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
      margin: 5,
      borderRadius: 10,
      justifyContent: 'space-between',
      width:'97%',
      height: '30%',
    },
    toggleButtonContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      padding: 5,

    },
    editContainer: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'start',
    },
    dropdown: {
      backgroundColor: '#fff',
      borderColor: 'black',
    },
    dropdownText: {
      color: 'black',
    },
    dropdownPlaceholder: {
      color: 'black',
    },
    dropdownContainer: {
      backgroundColor: 'white',
    },  
    safeArea: {
      flex: 1,
      marginBottom: 30,
    },
    scrollViewContent: {
      flexGrow: 1,
      padding: 16,
    },
    container: {
      flex: 1,
    },
    addEntryText: {
      marginBottom: 8,
    },
    dateText: {
      color: '#000',
    },
    locationButton: {
    width: 150, 
    height: 50,
    margin: 10,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, 
    },
    locationButtonText: {
      color: '#FFFFFF', 
      fontSize: 12, 
    },
    locationView: {
      flex: 1,
      marginBottom: 100,
      alignItems: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchBar: {
      flex: 1,
      height: 40,
    },
  });