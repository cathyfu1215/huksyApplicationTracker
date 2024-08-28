import React from 'react';
import { Pressable, Text} from 'react-native';
import styleHelper from '../styleHelper';

const CancelButton = ({ onPress }) => {
  return (
    <Pressable style={styleHelper.cancelButton} onPress={onPress}>
      <Text style={styleHelper.cancelButtonText}>Cancel</Text>
    </Pressable>
  );
};

export default CancelButton;
