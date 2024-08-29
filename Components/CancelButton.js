import React from 'react';
import { Pressable, Text} from 'react-native';
import styleHelper from '../styleHelper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CancelButton = ({ onPress }) => {
  return (
    <Pressable style={styleHelper.cancelButton} onPress={onPress}>
      <MaterialIcons name="cancel" size={24} color="black" />
    </Pressable>
  );
};

export default CancelButton;
