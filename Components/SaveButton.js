import React from 'react';
import { Pressable, Text} from 'react-native';
import styleHelper from '../styleHelper';

const SaveButton = ({ onPress }) => {
  return (
    <Pressable style={styleHelper.saveButton} onPress={onPress}>
      <Text style={styleHelper.cancelButtonText}>Save</Text>
    </Pressable>
  );
};

export default SaveButton;
