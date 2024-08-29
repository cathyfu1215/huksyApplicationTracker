import React from 'react';
import { Pressable, Text} from 'react-native';
import styleHelper from '../styleHelper';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SaveButton = ({ onPress }) => {
  return (
    <Pressable style={styleHelper.saveButton} onPress={onPress}>
     <FontAwesome name="check" size={24} color="black" />
    </Pressable>
  );
};

export default SaveButton;
